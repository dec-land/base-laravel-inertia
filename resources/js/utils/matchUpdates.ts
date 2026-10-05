import type { MatchData, MatchEventData, MatchTickData, PitchZone } from '@/types';

export function applyMatchTick(game: MatchData, data: MatchTickData): MatchData {
  if (game.id !== data.match_id) return game;
  return {
    ...game,
    minute: data.minute,
    displayMinute: data.display_minute,
    homeScore: data.home_score,
    awayScore: data.away_score,
    ballZone: data.zone as PitchZone,
    statusLabel: data.status_label,
    isLive: data.status === 'in_progress',
    stats: data.stats || game.stats,
    odds: data.odds || game.odds,
    var_phase: data.var_phase ?? null,
    var_dice_roll: data.var_dice_roll ?? null,
    var_target_player_id: data.var_target_player_id ?? null,
    var_target_player_name: data.var_target_player_name ?? null,
    isSuddenDeath: data.is_sudden_death ?? game.isSuddenDeath,
    isMultiball: data.is_multiball ?? game.isMultiball,
    secondBallZone: data.second_ball_zone ? (data.second_ball_zone as PitchZone) : null,
  };
}

export function applyMatchEvent(game: MatchData, data: MatchEventData): MatchData {
  if (game.id !== data.match_id) return game;
  const newLog = [data, ...(game.gameLog || [])];

  const isVarReview = data.eventType === 'var_review';
  const isVarResolved = data.eventType === 'var_check_safe' || data.eventType === 'var_banishment';

  const newVarPhase = isVarReview ? 'waiting' : isVarResolved ? 'resolved' : game.var_phase;
  const newVarTargetPlayerId = isVarReview
    ? (data.metadata?.playerId ?? game.var_target_player_id)
    : game.var_target_player_id;
  const newVarDiceRoll = isVarResolved
    ? (data.metadata?.varDiceRoll ?? game.var_dice_roll)
    : game.var_dice_roll;

  return {
    ...game,
    gameLog: newLog.slice(0, 10),
    var_phase: newVarPhase,
    var_target_player_id: newVarTargetPlayerId,
    var_dice_roll: newVarDiceRoll,
  };
}
