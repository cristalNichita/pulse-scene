<?php

namespace App\Exceptions;

use RuntimeException;

class BookingCapacityExceededException extends RuntimeException
{
    public function __construct()
    {
        parent::__construct(
            'There are not enough tickets available for this event.',
        );
    }
}
