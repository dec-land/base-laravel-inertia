<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;

/**
 * @property Carbon|null $email_verified_at
 */
#[Fillable([
    'name',
    'email',
    'password',
    'email_verified_at',
    'is_admin',
    'provider',
    'provider_id',
])]
#[Hidden([
    'password',
    'remember_token',
])]
class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable;

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_admin' => 'boolean',
            'pints' => 'integer',
            'receives_updates' => 'boolean',
            'has_completed_onboarding' => 'boolean',
        ];
    }
}
