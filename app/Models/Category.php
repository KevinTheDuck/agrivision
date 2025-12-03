<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug', 'color', 'is_restricted'];

    protected $casts = [
        'is_restricted' => 'boolean',
    ];

    public function posts()
    {
        return $this->belongsToMany(Post::class);
    }
}
