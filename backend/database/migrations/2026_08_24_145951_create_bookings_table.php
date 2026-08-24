<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table): void {
            $table->id();

            $table
                ->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete();

            $table
                ->foreignId('event_id')
                ->constrained()
                ->restrictOnDelete();

            $table
                ->string('code', 32)
                ->unique();

            $table
                ->unsignedTinyInteger('quantity');

            $table
                ->decimal('unit_price', 10, 2);

            $table
                ->decimal('total_price', 10, 2);

            $table
                ->char('currency', 3)
                ->default('USD');

            $table
                ->string('status', 30)
                ->index();

            $table->timestamp('booked_at');
            $table->timestamp('cancelled_at')->nullable();

            $table->timestamps();

            $table->index([
                'user_id',
                'status',
                'booked_at',
            ]);

            $table->index([
                'event_id',
                'status',
            ]);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
