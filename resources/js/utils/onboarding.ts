import type { MatchData, User } from '@/types';

export const findFavouriteLiveMatch = (
  user: User | null,
  liveGames: MatchData[],
): MatchData | null => {
  if (user === null || user.favorite_team_id === null) {
    return null;
  }

  return (
    liveGames.find(
      (game) =>
        game.homeTeam?.id === user.favorite_team_id || game.awayTeam?.id === user.favorite_team_id,
    ) ?? null
  );
};

export const canRunInitialOnboarding = (
  user: User | null,
  currentUrl: string,
  favouriteGame: MatchData | null,
): boolean => {
  return (
    user !== null &&
    user.favorite_team_id !== null &&
    !user.has_completed_onboarding &&
    favouriteGame !== null &&
    (currentUrl === '/' || currentUrl.startsWith('/live'))
  );
};
