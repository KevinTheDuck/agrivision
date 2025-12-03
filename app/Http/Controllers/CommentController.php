<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use App\Models\Vote;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'post_id' => 'required|exists:posts,id',
            'body' => 'required|string',
            'parent_id' => 'nullable|exists:comments,id',
        ]);

        $post = Post::findOrFail($request->post_id);
        if ($post->is_locked && !auth()->user()->isModerator()) {
            abort(403, 'This thread is locked.');
        }

        Comment::create([
            'user_id' => auth()->id(),
            'post_id' => $request->post_id,
            'parent_id' => $request->parent_id,
            'body' => $request->body,
        ]);

        return back();
    }

    public function destroy(Comment $comment)
    {
        if (auth()->id() !== $comment->user_id && !auth()->user()->isModerator()) {
            abort(403);
        }

        $comment->delete();
        return back();
    }

    public function togglePin(Comment $comment)
    {
        if (!auth()->user()->isModerator()) {
            abort(403);
        }

        if ($comment->parent_id) {
            abort(403, 'You can only pin top-level comments.');
        }

        $comment->is_pinned = !$comment->is_pinned;
        $comment->save();

        return back();
    }

    public function vote(Request $request, $id)
    {
        $request->validate([
            'value' => 'required|in:1,-1',
        ]);

        $comment = Comment::findOrFail($id);

        $existingVote = Vote::where('user_id', auth()->id())
            ->where('votable_id', $comment->id)
            ->where('votable_type', Comment::class)
            ->first();

        if ($existingVote) {
            $existingVote->delete();
        } else {
            Vote::create([
                'user_id' => auth()->id(),
                'votable_id' => $comment->id,
                'votable_type' => Comment::class,
                'value' => $request->value
            ]);
        }

        return back();
    }
}
