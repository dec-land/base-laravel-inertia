export type MatchEventCategory =
  | 'goal'
  | 'save'
  | 'miss'
  | 'awarded'
  | 'pass'
  | 'tackle'
  | 'foul'
  | 'yellow_card'
  | 'red_card'
  | 'injury'
  | 'var_review'
  | 'var_check_safe'
  | 'cosmic'
  | 'default';

const EVENT_CATEGORY_MAP: Partial<Record<App.Enums.MatchEventType, MatchEventCategory>> = {
  // Goals
  goal: 'goal',
  penalty_scored: 'goal',
  free_kick_goal: 'goal',
  corner_goal: 'goal',
  golden_goal: 'goal',

  // Saves
  save: 'save',
  penalty_saved: 'save',
  free_kick_saved: 'save',
  corner_saved: 'save',

  // Misses
  penalty_missed: 'miss',
  free_kick_missed: 'miss',
  corner_missed: 'miss',

  // Set Pieces Awarded
  penalty_awarded: 'awarded',
  free_kick_awarded: 'awarded',
  corner_awarded: 'awarded',

  // Cosmic / Extreme Incidents
  var_banishment: 'cosmic',
  incineration: 'cosmic',
  pitch_swallow: 'cosmic',

  // Match Actions & Infractions
  pass: 'pass',
  tackle: 'tackle',
  foul: 'foul',
  yellow_card: 'yellow_card',
  red_card: 'red_card',
  injury: 'injury',
  var_review: 'var_review',
  var_check_safe: 'var_check_safe',
};

export const getMatchEventCategory = (eventType: App.Enums.MatchEventType): MatchEventCategory =>
  EVENT_CATEGORY_MAP[eventType] ?? 'default';

export const isGoalEvent = (eventType: App.Enums.MatchEventType): boolean =>
  getMatchEventCategory(eventType) === 'goal';

export const isSaveEvent = (eventType: App.Enums.MatchEventType): boolean =>
  getMatchEventCategory(eventType) === 'save';

export const isMissEvent = (eventType: App.Enums.MatchEventType): boolean =>
  getMatchEventCategory(eventType) === 'miss';

export const isAwardedEvent = (eventType: App.Enums.MatchEventType): boolean =>
  getMatchEventCategory(eventType) === 'awarded';

export const isCosmicEvent = (eventType: App.Enums.MatchEventType): boolean =>
  getMatchEventCategory(eventType) === 'cosmic';

const CATEGORY_BACKGROUND_CLASSES: Partial<Record<MatchEventCategory, string>> = {
  goal: 'bg-success/10 font-medium',
  awarded: 'bg-primary/15 font-bold',
  yellow_card: 'bg-warning/10 font-medium',
  red_card: 'bg-error/10 font-medium',
  injury: 'bg-error/10 font-medium',
  miss: 'bg-error/10 font-medium',
  var_review: 'bg-error/10 text-error font-bold',
  var_check_safe: 'bg-success/10 text-success font-bold',
  cosmic: 'bg-error/20 text-error font-black',
  save: 'bg-info/10 font-medium',
};

const CATEGORY_FEED_CLASSES: Partial<Record<MatchEventCategory, string>> = {
  goal: 'bg-success/10 text-success font-medium',
  yellow_card: 'bg-warning/10 text-warning font-medium',
  red_card: 'bg-error/10 text-error font-medium',
  injury: 'bg-error/10 text-error font-medium',
  miss: 'bg-error/10 text-error font-medium',
  var_review: 'bg-error/10 text-error font-bold',
  var_check_safe: 'bg-success/10 text-success font-bold',
  cosmic: 'bg-error/20 text-error font-black',
  save: 'bg-info/10 text-info font-medium',
};

export const matchEventBackgroundClasses = (eventType: App.Enums.MatchEventType): string =>
  CATEGORY_BACKGROUND_CLASSES[getMatchEventCategory(eventType)] ?? '';

export const matchEventFeedClasses = (eventType: App.Enums.MatchEventType): string =>
  CATEGORY_FEED_CLASSES[getMatchEventCategory(eventType)] ?? '';
