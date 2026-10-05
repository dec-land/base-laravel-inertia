import type { MatchData, MatchEventData } from '@/types';

export const mergeMatchLogs = (
  currentLogs: MatchEventData[],
  hydratedLogs: MatchEventData[],
): MatchEventData[] => {
  const seenIds = new Set<string>();

  return [...currentLogs, ...hydratedLogs]
    .filter((event) => {
      if (seenIds.has(event.id)) {
        return false;
      }

      seenIds.add(event.id);
      return true;
    })
    .slice(0, 10);
};

export const hasUsefulStats = (match: MatchData) => match.isDetailed === true;

export const mergeHydratedMatch = (current: MatchData, hydrated: MatchData): MatchData => {
  const detailSource = hydrated.isDetailed ? hydrated : current;

  return {
    ...detailSource,
    homeScore: current.homeScore,
    awayScore: current.awayScore,
    minute: current.minute,
    displayMinute: current.displayMinute,
    isLive: current.isLive,
    statusLabel: current.statusLabel,
    gameLog: mergeMatchLogs(current.gameLog, hydrated.gameLog),
    stats: hasUsefulStats(current) ? current.stats : hydrated.stats,
    odds: current.odds ?? hydrated.odds,
    var_phase: current.var_phase ?? hydrated.var_phase,
    var_dice_roll: current.var_dice_roll ?? hydrated.var_dice_roll,
    var_target_player_id: current.var_target_player_id ?? hydrated.var_target_player_id,
    var_target_player_name: current.var_target_player_name ?? hydrated.var_target_player_name,
    isDetailed: current.isDetailed || hydrated.isDetailed,
  };
};
