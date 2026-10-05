import { trans } from './trans';

export const DEFAULT_MIN_BET = 10;
export const DEFAULT_MAX_BET = 250;
export const DEFAULT_BET_AMOUNT = 20;
export const BET_STEP_AMOUNT = 10;
export const MIN_ODDS = 1.01;

export const MARKET_LABELS: Record<string, string> = {
  '1x2_home': trans('betting.market_names.1x2_home'),
  '1x2_draw': trans('betting.market_names.1x2_draw'),
  '1x2_away': trans('betting.market_names.1x2_away'),
  'ou_over2.5': trans('betting.market_names.ou_over_25'),
  'ou_under2.5': trans('betting.market_names.ou_under_25'),
  btts_yes: trans('betting.market_names.btts_yes'),
  btts_no: trans('betting.market_names.btts_no'),
  'cards_over3.5': trans('betting.market_names.cards_over_35'),
  'cards_under3.5': trans('betting.market_names.cards_under_35'),
  world_cup_winner: trans('betting.market_names.world_cup_winner'),
};

export interface BetLimits {
  userPints: number;
  minBet: number;
  maxBet: number;
  effectiveMax: number;
  isTooSkint: (amount: number) => boolean;
}

export const getBetLimits = (
  user: { pints?: number; min_bet?: number; max_bet?: number } | null | undefined,
): BetLimits => {
  const userPints = user?.pints ?? 0;
  const minBet = user?.min_bet ?? DEFAULT_MIN_BET;
  const maxBet = user?.max_bet ?? DEFAULT_MAX_BET;
  const effectiveMax = Math.max(minBet, Math.min(userPints > 0 ? userPints : minBet, maxBet));

  return {
    userPints,
    minBet,
    maxBet,
    effectiveMax,
    isTooSkint: (amount: number) => userPints < minBet || userPints < amount,
  };
};
