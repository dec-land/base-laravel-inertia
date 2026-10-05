<?php

declare(strict_types=1);

use App\Console\Commands\AdvanceDay;
use App\Console\Commands\CompactMatchEvents;
use App\Console\Commands\PersistRenovationContributionsCommand;
use App\Console\Commands\PersistRespectsCommand;
use App\Console\Commands\ProcessElection;
use App\Console\Commands\PruneExpiredGlobalMessages;
use App\Console\Commands\PruneExpiredModifiers;
use App\Console\Commands\StartSeason;
use App\Console\Commands\TransitionElectionToFinishing;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\RedirectRestrictedWebRequests;
use App\Settings\FubballElectionSettings;
use App\Settings\FubballSeasonSettings;
use App\Utils\TimeUtil;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
use Illuminate\Http\Request;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Routing\Middleware\ThrottleRequests;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        health: '/up',
        apiPrefix: 'api/v1',
        channels: __DIR__.'/../routes/channels.php',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->trustProxies(at: '*');

        $middleware->api(prepend: [
            SubstituteBindings::class,
        ]);
        $middleware->encryptCookies(except: [
            'timezone',
        ]);

        $middleware->web(append: [
            ThrottleRequests::class.':public',
            RedirectRestrictedWebRequests::class,
            HandleInertiaRequests::class,
        ]);
        $middleware->preventRequestForgery(except: [
            'webhooks/stripe',
            'webhooks/lemon-squeezy',
        ]);
    })
    // For local we can skip the scheduler and rely on the game engine to advance the day at a super fast rate
    ->withSchedule(function (Schedule $schedule) {
        $schedule->command(CompactMatchEvents::class, ['--queue'])
            ->hourly()
            ->withoutOverlapping(10);

        $schedule->command(PruneExpiredGlobalMessages::class)
            ->hourly()
            ->withoutOverlapping(10);

        $schedule->command(PruneExpiredModifiers::class)
            ->hourly()
            ->withoutOverlapping(10);

        $schedule->command(PersistRespectsCommand::class)
            ->everyMinute()
            ->withoutOverlapping(10);

        $schedule->command(PersistRenovationContributionsCommand::class)
            ->everyMinute()
            ->withoutOverlapping(10);

        $schedule->command('queue:prune-failed --hours=168')
            ->daily()
            ->withoutOverlapping(10);

        $schedule->command('queue:prune-batches --hours=48')
            ->daily()
            ->withoutOverlapping(10);

        if (! app()->isLocal()) {
            $schedule->command(AdvanceDay::class)
                ->hourly()
                ->withoutOverlapping(10);

            $startSeasonHour = app(FubballSeasonSettings::class)->start_season_hour;
            $schedule->command(StartSeason::class)
                ->mondays()
                ->at(TimeUtil::formatHour($startSeasonHour))
                ->withoutOverlapping(10);

            $electionSettings = app(FubballElectionSettings::class);

            $schedule->command(TransitionElectionToFinishing::class)
                ->sundays()
                ->at(TimeUtil::formatHour($electionSettings->election_finishing_hour))
                ->withoutOverlapping(10);

            $schedule->command(ProcessElection::class)
                ->sundays()
                ->at(TimeUtil::formatHour($electionSettings->election_results_hour))
                ->withoutOverlapping(10);
        }
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->shouldRenderJsonWhen(function (Request $request, Throwable $exception): bool {
            return $request->is('api/*') || $request->expectsJson();
        });

        $exceptions->render(function (ThrottleRequestsException $e, Request $request) {
            if ($request->header('X-Inertia')) {
                return back()->withErrors(['message' => 'Too many requests. Give it a rest for a minute mate.']);
            }
        });

        $exceptions->render(function (Throwable $exception, Request $request) {
            if ($exception instanceof AuthenticationException || $exception instanceof ValidationException) {
                return null;
            }

            if ($request->is('admin*') || $request->is('api/*') || $request->expectsJson()) {
                return null;
            }

            $status = $exception instanceof HttpExceptionInterface ? $exception->getStatusCode() : 500;

            if ($status === 419) {
                return back()->with('error', 'Your session has expired. Please try again.');
            }

            if (! in_array($status, [403, 404, 500, 503], true)) {
                $status = 500;
            }

            $reference = (string) Str::uuid();

            if ($status >= 500) {
                Log::error('Web request failed', [
                    'reference' => $reference,
                    'exception' => $exception,
                    'url' => $request->fullUrl(),
                    'user_id' => $request->user()?->id,
                ]);
            }

            return Inertia::render('ErrorPage', [
                'status' => $status,
                'reference' => $reference,
            ])->toResponse($request)->setStatusCode($status);
        });
    })
    ->create();
