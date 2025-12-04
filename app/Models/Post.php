<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'body',
        'image_path',
        'auto_classify',
        'classification_results',
        'is_locked',
        'is_featured',
        'views',
    ];

    protected $casts = [
        'auto_classify' => 'boolean',
        'classification_results' => 'array',
        'is_locked' => 'boolean',
        'is_featured' => 'boolean',
        'views' => 'integer',
    ];

    protected $appends = ['score', 'user_vote'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class)->whereNull('parent_id');
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
