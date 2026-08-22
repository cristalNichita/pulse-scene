<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table): void {
            $table->id();

            $table
                ->foreignId('category_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->restrictOnDelete();

            $table
                ->foreignId('venue_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->restrictOnDelete();

            $table
                ->foreignId('organizer_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->restrictOnDelete();

            $table->string('title');
            $table->string('slug')->unique();

            $table->string('subtitle')->nullable();

            $table->text('description');
            $table->longText('content')->nullable();

            $table->string('cover_image');

            $table->dateTime('starts_at');
            $table->dateTime('ends_at')->nullable();

            $table->decimal('price', 10, 2)->default(0);
            $table->char('currency', 3)->default('USD');

            $table->unsignedInteger('capacity')->nullable();
            $table->unsignedTinyInteger('minimum_age')->nullable();

            $table
                ->string('status', 30)
                ->default('draft')
                ->index();

            $table
                ->boolean('is_featured')
                ->default(false)
                ->index();

            $table->dateTime('published_at')->nullable();

            $table->timestamps();

            $table->index([
                'status',
                'starts_at',
            ]);

            $table->index([
                'category_id',
                'starts_at',
            ]);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
