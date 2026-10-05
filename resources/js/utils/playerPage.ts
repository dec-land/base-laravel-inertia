import clsx from 'clsx';

export type PlayerTab = 'info' | 'stats' | 'feed' | 'items';

export const playerStatRows = (stats: {
  goals: number;
  passes: number;
  tackles: number;
  saves: number;
  fouls: number;
  yellowCards: number;
  redCards: number;
}) =>
  [
    ['player.stats.labels.goals', stats.goals],
    ['player.stats.labels.passes', stats.passes],
    ['player.stats.labels.tackles', stats.tackles],
    ['player.stats.labels.saves', stats.saves],
    ['player.stats.labels.fouls', stats.fouls],
    ['player.stats.labels.yellow_cards', stats.yellowCards],
    ['player.stats.labels.red_cards', stats.redCards],
  ] as const;

export const playerVibeKey = (
  vibe: number,
):
  | 'player.vibes.unknown'
  | 'player.vibes.buzzing'
  | 'player.vibes.sound'
  | 'player.vibes.rattled'
  | 'player.vibes.gutted' => {
  if (vibe < 0) return 'player.vibes.unknown';
  if (vibe >= 0.66) return 'player.vibes.buzzing';
  if (vibe >= 0.42) return 'player.vibes.sound';
  if (vibe >= 0.2) return 'player.vibes.rattled';
  return 'player.vibes.gutted';
};

export const playerVibeLabel = (vibe: number) => {
  if (vibe < 0) return 'Unknown';
  if (vibe >= 0.66) return 'Buzzing';
  if (vibe >= 0.42) return 'Sound';
  if (vibe >= 0.2) return 'Rattled';
  return 'Gutted';
};

export const playerVibeTone = (vibe: number) =>
  clsx(
    vibe >= 0.66 && 'text-success',
    vibe >= 0.42 && vibe < 0.66 && 'text-base-content',
    vibe >= 0.2 && vibe < 0.42 && 'text-warning',
    vibe >= 0 && vibe < 0.2 && 'text-error',
    vibe < 0 && 'text-base-content/50',
  );

export { matchEventFeedClasses as playerFeedEventClasses } from './matchEvents';
