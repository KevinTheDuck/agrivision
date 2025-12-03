<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use App\Models\Vote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ForumController extends Controller
{
    public function index(Request $request)
    {
        $hasFilter = $request->has('category') || $request->has('search');

        // Fetch Featured and Announcements only if no filter is active
        $featuredPosts = [];
        $announcementPosts = [];

        if (!$hasFilter) {
            $featuredPosts = Post::with(['user', 'categories', 'votes'])
                ->withCount('comments')
                ->where('is_featured', true)
                ->latest()
                ->get();

            $announcementPosts = Post::with(['user', 'categories', 'votes'])
                ->withCount('comments')
                ->whereHas('categories', function ($q) {
                    $q->where('slug', 'announcements');
                })
                ->latest()
                ->get();
        }

        // Main Query
        $query = Post::with(['user', 'categories', 'votes'])
            ->withCount('comments');

        // If no filter, exclude the posts shown in the top sections
        if (!$hasFilter) {
            $query->where('is_featured', false)
                  ->whereDoesntHave('categories', function ($q) {
                      $q->where('slug', 'announcements');
                  });
        }

        // Filter by category
        if ($request->has('category') && $request->category) {
            if ($request->category === 'featured') {
                $query->where('is_featured', true);
            } else {
                $query->whereHas('categories', function ($q) use ($request) {
                    $q->where('slug', $request->category);
                });
            }
        }

        // Search
        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('body', 'like', '%' . $request->search . '%');
            });
        }

        // Sort
        $sort = $request->input('sort', 'newest');
        if ($sort === 'best') {
            $query->withSum('votes', 'value')->orderByDesc('votes_sum_value');
        } else {
            $query->latest();
        }

        $posts = $query->paginate(5)->withQueryString();

        return Inertia::render('Forum/Index', [
            'posts' => $posts,
            'featuredPosts' => $featuredPosts,
            'announcementPosts' => $announcementPosts,
            'categories' => Category::all(),
            'filters' => $request->only(['search', 'category', 'sort']),
        ]);
    }

    public function show($id)
    {
        $post = Post::with(['user', 'categories', 'votes'])
            ->with(['comments' => function ($query) {
                $query->with(['user', 'votes', 'replies.user', 'replies.votes'])
                      ->orderBy('is_pinned', 'desc')
                      ->orderBy('created_at', 'desc');
            }])
            ->findOrFail($id);

        return Inertia::render('Forum/Show', [
            'post' => $post,
        ]);
    }

    public function create()
    {
        return Inertia::render('Forum/Create', [
            'categories' => Category::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'categories' => 'array',
            'image' => 'nullable|image|max:2048',
            'auto_classify' => 'boolean',
        ]);

        $post = new Post();
        $post->user_id = auth()->id();
        $post->title = $request->title;
        $post->body = $request->body;
        $post->auto_classify = $request->auto_classify ?? false;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('posts', 'public');
            $post->image_path = '/storage/' . $path;
            
            // Placeholder for auto-classification logic
            if ($post->auto_classify) {
                // Call CV model API here
                // $post->classification_results = ...
            }
        }

        $post->save();

        if ($request->has('categories')) {
            $categories = Category::whereIn('id', $request->categories)->get();
            
            // Check for restricted categories
            foreach ($categories as $category) {
                if ($category->is_restricted && !auth()->user()->isModerator()) {
                    abort(403, 'You are not authorized to post in restricted categories.');
                }
            }

            $post->categories()->attach($request->categories);
        }

        return redirect()->route('forum.index');
    }

    public function destroy(Post $post)
    {
        if (auth()->id() !== $post->user_id && !auth()->user()->isModerator()) {
            abort(403);
        }

        $post->delete();
        return redirect()->route('forum.index');
    }

    public function toggleFeature(Post $post)
    {
        if (!auth()->user()->isModerator()) {
            abort(403, 'Only moderators can feature posts.');
        }

        $post->is_featured = !$post->is_featured;
        $post->save();

        return back();
    }

    public function toggleLock(Post $post)
    {
        if (!auth()->user()->isModerator()) {
            abort(403);
        }

        $post->is_locked = !$post->is_locked;
        $post->save();

        return back();
    }

    public function vote(Request $request, $id)
    {
        $request->validate([
            'value' => 'required|in:1,-1',
        ]);

        $post = Post::findOrFail($id);
        
        $existingVote = Vote::where('user_id', auth()->id())
            ->where('votable_id', $post->id)
            ->where('votable_type', Post::class)
            ->first();

        if ($existingVote) {
            // If a vote exists, we remove it regardless of whether it's the same or different.
            // If same: Toggles off (1 -> 0).
            // If different: Neutralizes (1 -> 0) instead of switching (1 -> -1), preventing the -2 jump.
            $existingVote->delete();
        } else {
            Vote::create([
                'user_id' => auth()->id(),
                'votable_id' => $post->id,
                'votable_type' => Post::class,
                'value' => $request->value
            ]);
        }

        return back();
    }
}
