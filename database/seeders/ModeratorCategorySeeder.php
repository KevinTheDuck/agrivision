<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class ModeratorCategorySeeder extends Seeder
{
    public function run(): void
    {
        Category::create([
            'name' => 'Featured',
            'slug' => 'featured',
            'color' => 'bg-yellow-600',
            'is_restricted' => true,
        ]);

        Category::create([
            'name' => 'Announcements',
            'slug' => 'announcements',
            'color' => 'bg-red-600',
            'is_restricted' => true,
        ]);
    }
}
