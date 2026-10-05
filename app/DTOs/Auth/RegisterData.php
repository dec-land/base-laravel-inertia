<?php

declare(strict_types=1);

namespace App\DTOs\Auth;

use Spatie\LaravelData\Attributes\Validation\Confirmed;
use Spatie\LaravelData\Attributes\Validation\Email;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Min;
use Spatie\LaravelData\Attributes\Validation\StringType;
use Spatie\LaravelData\Attributes\Validation\Unique;
use Spatie\LaravelData\Data;

class RegisterData extends Data
{
    public function __construct(
        #[StringType, Max(255)]
        public string $name,
        #[StringType, Email, Max(255), Unique('users', 'email')]
        public string $email,
        #[StringType, Min(8), Confirmed]
        public string $password,
    ) {}
}
