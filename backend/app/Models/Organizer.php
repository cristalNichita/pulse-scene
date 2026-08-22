<?php

namespace App\Models;

use Database\Factories\OrganizerFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Organizer extends Model
{
    /** @use HasFactory<OrganizerFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
    ];

    public function events(): HasMany
    {
        return $this->hasMany(Event::class);
    }
}
