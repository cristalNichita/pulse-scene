<?php

namespace App\Exceptions;

use RuntimeException;

class ReviewAlreadyExistsException extends RuntimeException
{
    public function __construct()
    {
        parent::__construct(
            'You have already reviewed this event.',
        );
    }
}
