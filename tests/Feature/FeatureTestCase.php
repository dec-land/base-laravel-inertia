<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Facades\Storage;
use Illuminate\Testing\TestResponse;
use Spatie\Snapshots\MatchesSnapshots;

abstract class FeatureTestCase extends BaseTestCase
{
    use CreatesModels;
    use MatchesSnapshots;
    use RefreshDatabase;

    protected User $user;

    protected $seed = true;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        Queue::fake();
        Mail::fake();
        Storage::fake('s3');
    }

    protected function createUserAndLogin(array $overrides = []): User
    {
        $user = User::factory()->create($overrides);

        $this->actingAs($user);

        return $user;
    }

    protected function assertKeySnapshot(TestResponse $response, ?string $path = null)
    {
        $data = $response->json($path);
        $this->assertNotNull($data);
        $structure = $this->extractStructure($data);

        $this->assertMatchesSnapshot($structure);
    }

    protected function extractStructure(mixed $data): array
    {
        $structure = [];

        foreach ($data as $key => $value) {
            if (is_array($value) || is_object($value)) {
                $structure[$key] = $this->extractStructure((array) $value);
            } else {
                $structure[$key] = null;
            }
        }

        return $structure;
    }
}
