<?php

namespace App\Http\Controllers;

use App\Models\Comment;
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

        Comment::create([
            'user_id' => auth()->id(),
            'post_id' => $request->post_id,
            'parent_id' => $request->parent_id,
            'body' => $request->body,
        ]);

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
