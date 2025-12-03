<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default('user'); // user, moderator, admin
        });

        Schema::table('posts', function (Blueprint $table) {
            $table->boolean('is_locked')->default(false);
        });

        Schema::table('categories', function (Blueprint $table) {
            $table->boolean('is_restricted')->default(false); // Only moderators can post in restricted categories
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('role');
        });

        Schema::table('posts', function (Blueprint $table) {
            $table->dropColumn('is_locked');
        });

        Schema::table('categories', function (Blueprint $table) {
            $table->dropColumn('is_restricted');
        });
    }
};
