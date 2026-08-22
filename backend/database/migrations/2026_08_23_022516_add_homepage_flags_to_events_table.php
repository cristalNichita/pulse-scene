<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('events', function (Blueprint $table): void {
            $table
                ->boolean('is_trending')
                ->default(false)
                ->index()
                ->after('is_featured');

            $table
                ->boolean('is_popular')
                ->default(false)
                ->index()
                ->after('is_trending');
        });
    }

    public function down(): void
    {
        Schema::table('events', function (Blueprint $table): void {
            $table->dropColumn([
                'is_trending',
                'is_popular',
            ]);
        });
    }
};
