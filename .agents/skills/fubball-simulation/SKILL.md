---
name: fubball-simulation
description: "Handles Fubball's continuous match simulation engine, dynamic incident system, vibe state tracking, weather conditions, referee impacts, odds generation, and live event persistence."
license: MIT
metadata:
  author: fubball
---

# Fubball Match Engine & Simulation

## When to Apply

Activate this skill when working on:

- Game simulation commands (`RunGameEngine`, `TickLiveGames`, `AdvanceDay`, `StartSeason`)
- Match action orchestration in `App\Services\MatchEngine`
- Dynamic incidents in `App\Services\Incidents`
- Live player vibe calculations and caching (`PlayerMatchVibeStateService`)
- Weather generation and conditions (`WeatherGeneratorService`, `WeatherCondition`)
- Referee match impacts and assignments (`RefereeMatchImpactService`, `RefereeAssignmentService`)
- Odds calculation and betting market generation (`OddsGeneratorService`)

## Key Architecture & Components

### 1. Match Simulation Loop

- `MatchEngine` coordinates ticks for active games (`MatchStatus::InProgress`).
- `MatchActionSimulator` calculates possession, passes, tackles, shots, fouls, and cards on each tick.
- `MatchProbabilityCalculator` factors in team stats (aggregated via `TeamStatAggregator`), player perks, referee bias, pitch conditions, and current weather.

### 2. High-Performance Caching & Batch Persistence

- In-flight player vibe and live attributes are updated in the match-scoped cache via `PlayerMatchVibeStateService` to avoid database churn during ticks.
- Live events (`MatchEvent`) and game status updates are batched and flushed via `LiveEventPersister`.

### 3. Perks vs Items

- **Player Perks**: Modify primary match engine ratings (`rating_goalkeeping`, `rating_defending`, `rating_passing`, `rating_shooting`) or baseline `vibe`.
- **Player Items**: Distinct inventory objects stored in `fubball_items`.

### 4. Dynamic Incidents

- Incident classes implement `App\Contracts\IncidentContract` and register with `IncidentEngine`.
- Evaluated on lifecycle triggers: `MatchCompleted` or `DayAdvanced`.

### 5. Settings Configuration

- Probability tables, engine tick rates, incident weights, and card chances reside in Spatie Settings (`App\Settings\FubballEngineSettings` backed by `database/settings/defaults/fubball_engine.php`).
- Simulation speed is governed by `time_scale` (multiplies tick rate and scales sleep in `RunGameEngine`), while match pacing is controlled via `tick_in_game_seconds` (supports sub-minute and multi-minute tick advances in `MatchEngine`). Super Mode (20x) and fine-grained time scales can be dynamically adjusted via the `DebugOverlay`.
