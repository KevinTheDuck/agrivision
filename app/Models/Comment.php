<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'post_id', 'parent_id', 'body', 'is_pinned'];

    protected $casts = [
        'is_pinned' => 'boolean',
    ];

    protected $appends = ['score', 'user_vote'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    public function parent()
    {
        return $this->belongsTo(Comment::class, 'parent_id');
    }

    public function replies()
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }

    public function votes()
    {
        return $this->morphMany(Vote::class, 'votable');
    }

    public function getScoreAttribute()
    {
        return $this->votes()->sum('value');
    }

    public function getUserVoteAttribute()
    {
        if (auth()->check()) {
            return $this->votes()->where('user_id', auth()->id())->value('value');
        }
        return 0;
    }
}
