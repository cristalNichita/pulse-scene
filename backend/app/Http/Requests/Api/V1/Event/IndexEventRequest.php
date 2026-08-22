<?php

namespace App\Http\Requests\Api\V1\Event;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class IndexEventRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'search' => [
                'nullable',
                'string',
                'max:100',
            ],

            'category' => [
                'nullable',
                'string',
                Rule::exists('categories', 'slug'),
            ],

            'location' => [
                'nullable',
                'string',
                'max:100',
            ],

            'date' => [
                'nullable',
                Rule::in([
                    'today',
                    'this-weekend',
                ]),
            ],

            'price' => [
                'nullable',
                Rule::in([
                    'free',
                    'paid',
                ]),
            ],

            'per_page' => [
                'nullable',
                'integer',
                'min:1',
                'max:24',
            ],
        ];
    }
}
