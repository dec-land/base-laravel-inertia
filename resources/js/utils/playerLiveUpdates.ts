import type { MatchEventData, PlayerProfileData } from '@/types';
import { getMatchEventCategory, type MatchEventCategory } from '@/utils/matchEvents';

type SeasonStatKey = keyof PlayerProfileData['currentSeasonStats'];

const CATEGORY_TO_STAT_KEY: Partial<Record<MatchEventCategory, SeasonStatKey>> = {
  goal: 'goals',
  save: 'saves',
  pass: 'passes',
  tackle: 'tackles',
  foul: 'fouls',
  yellow_card: 'yellowCards',
  red_card: 'redCards',
};

const getStatKeyForEvent = (eventType: App.Enums.MatchEventType): SeasonStatKey | null =>
  CATEGORY_TO_STAT_KEY[getMatchEventCategory(eventType)] ?? null;

export const incrementForEvent = (
  player: PlayerProfileData,
  eventType: App.Enums.MatchEventType,
): PlayerProfileData => {
  if (eventType === 'injury') {
    return { ...player, status: 'injured' };
  }

  const statKey = getStatKeyForEvent(eventType);
  if (!statKey) {
    return player;
  }

  return {
    ...player,
    currentSeasonStats: {
      ...player.currentSeasonStats,
      [statKey]: player.currentSeasonStats[statKey] + 1,
    },
  };
};

export const feedEventFromMatchEvent = (
  event: MatchEventData,
): App.DTOs.Player.PlayerFeedEventData => ({
  id: event.id,
  matchId: event.match_id,
  minute: event.minute,
  displayMinute: event.displayMinute,
  eventType: event.eventType,
  description: event.description,
  season: null,
  day: null,
  opponentName: null,
  created_at: null,
});
