<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'General', 'slug' => 'general', 'color' => 'bg-zinc-500'],
            ['name' => 'Technology', 'slug' => 'technology', 'color' => 'bg-brand'],
            ['name' => 'Farming', 'slug' => 'farming', 'color' => 'bg-green-600'],
            ['name' => 'Marketplace', 'slug' => 'marketplace', 'color' => 'bg-yellow-600'],
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate(['slug' => $category['slug']], $category);
        }
    }
}
