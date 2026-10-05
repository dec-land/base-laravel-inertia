<?php

declare(strict_types=1);

namespace App\DTOs\Auth;

use Spatie\LaravelData\Attributes\Validation\Email;
use Spatie\LaravelData\Attributes\Validation\StringType;
use Spatie\LaravelData\Data;

class LoginData extends Data
{
    public function __construct(
        #[Email]
        public string $email,
        #[StringType]
        public string $password,
        public bool $remember = false,
    ) {}
}
