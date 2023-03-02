import IMatches from '../interfaces/IMatches';
import ITeam from '../interfaces/ITeams';

export default class LeaderboardService {
  public static totalPointsAndVictories(id: number, matches: IMatches[]): number[] {
    let totalPoints = 0;
    let totalVictories = 0;
    matches.forEach(({ victory }) => {
      if (victory === id) {
        totalPoints += 3;
        totalVictories += 1;
      }
    });
    return [totalPoints, totalVictories];
  }

  public static totalGames(id: number, matches: IMatches[]): number {
    let totalGames = 0;
    matches.forEach(({ homeTeamId, awayTeamId }) => {
      if (homeTeamId === id || awayTeamId === id) {
        totalGames += 1;
      }
    });
    return totalGames;
  }

  public static totalDraws(id: number, matches: IMatches[]): number {
    const filtered = matches
      .filter(({ homeTeamId, awayTeamId }) => homeTeamId === id || awayTeamId === id);

    let totalDraws = 0;
    filtered.forEach(({ victory }) => {
      if (victory === 0) {
        totalDraws += 1;
      }
    });
    return totalDraws;
  }

  public static totalLosses(id: number, matches: IMatches[]): number {
    const filteredAsHome = matches.filter(({ homeTeamId }) => homeTeamId === id);
    const filteredAsAway = matches.filter(({ awayTeamId }) => awayTeamId === id);
    let totalLosses = 0;

    filteredAsHome.forEach(({ victory, awayTeamId }) => {
      if (victory === awayTeamId) {
        totalLosses += 1;
      }
    });
    filteredAsAway.forEach(({ victory, homeTeamId }) => {
      if (victory === homeTeamId) {
        totalLosses += 1;
      }
    });
    return totalLosses;
  }

  public static goalsFavor(id: number, matches: IMatches[]): number {
    let goalsFavor = 0;
    matches.forEach(({ homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamId === id) {
        goalsFavor += homeTeamGoals;
      }
      if (awayTeamId === id) {
        goalsFavor += awayTeamGoals;
      }
    });
    return goalsFavor;
  }

  public static goalsOwn(id: number, matches: IMatches[]): number {
    let goalsOwn = 0;
    matches.forEach(({ homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamId === id) {
        goalsOwn += awayTeamGoals;
      }
      if (awayTeamId === id) {
        goalsOwn += homeTeamGoals;
      }
    });
    return goalsOwn;
  }

  public static calculatePoints(teams: ITeam[], matchesWithVictories: IMatches[]) {
    const result = teams.map(({ id, teamName }) => {
      const totalPoints = LeaderboardService
        .totalPointsAndVictories(id as number, matchesWithVictories);
      const totalGames = LeaderboardService.totalGames(id as number, matchesWithVictories);
      const totalDraws = LeaderboardService.totalDraws(id as number, matchesWithVictories);
      const totalLosses = LeaderboardService.totalLosses(id as number, matchesWithVictories);
      const goalsFavor = LeaderboardService.goalsFavor(id as number, matchesWithVictories);
      const goalsOwn = LeaderboardService.goalsOwn(id as number, matchesWithVictories);

      return { name: teamName,
        totalPoints: totalPoints[0],
        totalGames,
        totalVictories: totalPoints[1],
        totalDraws,
        totalLosses,
        goalsFavor,
        goalsOwn };
    });
    return result;
  }
}
