<?php

namespace App\Models;

use App\Enums\EventStatus;
use Database\Factories\EventFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Event extends Model
{
    /** @use HasFactory<EventFactory> */
    use HasFactory;

    protected $fillable = [
        'category_id',
        'venue_id',
        'organizer_id',
        'title',
        'slug',
        'subtitle',
        'description',
        'content',
        'cover_image',
        'starts_at',
        'ends_at',
        'price',
        'currency',
        'capacity',
        'minimum_age',
        'status',
        'is_featured',
        'published_at',
        'is_trending',
        'is_popular',
    ];

    protected function casts(): array
    {
        return [
            'starts_at' => 'datetime',
            'ends_at' => 'datetime',
            'price' => 'decimal:2',
            'capacity' => 'integer',
            'minimum_age' => 'integer',
            'status' => EventStatus::class,
            'is_featured' => 'boolean',
            'is_trending' => 'boolean',
            'is_popular' => 'boolean',
            'published_at' => 'datetime',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function venue(): BelongsTo
    {
        return $this->belongsTo(Venue::class);
    }

    public function organizer(): BelongsTo
    {
        return $this->belongsTo(Organizer::class);
    }

    public function images(): HasMany
    {
        return $this
            ->hasMany(EventImage::class)
            ->orderBy('position');
    }

    public function reviews(): HasMany
    {
        return $this
            ->hasMany(Review::class)
            ->latest();
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query
            ->where('status', EventStatus::Published)
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }

    public function favorites(): HasMany
    {
        return $this->hasMany(Favorite::class);
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }
}
