import IMatches from '../interfaces/IMatches';
import ITeam from '../interfaces/ITeams';

export default class LeaderboardServiceAway {
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
    matches.forEach(({ awayTeamId }) => {
      if (awayTeamId === id) {
        totalGames += 1;
      }
    });
    return totalGames;
  }

  public static totalLossesAndDraws(id: number, mat: IMatches[]): number[] {
    const filt = mat.filter(({ awayTeamId }) => awayTeamId === id);

    const filteredAsHome = mat.filter(({ awayTeamId }) => awayTeamId === id);

    let totalLosses = 0;
    let totalDraws = 0;

    filt.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals === awayTeamGoals) { totalDraws += 1; }
    });

    filteredAsHome.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (awayTeamGoals < homeTeamGoals) {
        totalLosses += 1;
      }
    });
    return [totalLosses, totalDraws];
  }

  public static goalsFavor(id: number, matches: IMatches[]): number[] {
    let goalsFavor = 0;
    let goalsOwn = 0;
    matches.forEach(({ awayTeamId, homeTeamGoals, awayTeamGoals }) => {
      if (awayTeamId === id) {
        goalsFavor += awayTeamGoals;
      }
      if (awayTeamId === id) {
        goalsOwn += homeTeamGoals;
      }
    });
    return [goalsFavor, goalsOwn];
  }

  public static calculatePoints(teams: ITeam[], matches: IMatches[]) {
    const result = teams.map(({ id, teamName }) => {
      const totalPoints = LeaderboardServiceAway
        .totalPointsAndVictories(id as number, matches);
      const totalGames = LeaderboardServiceAway.totalGames(id as number, matches);
      const losesDraws = LeaderboardServiceAway.totalLossesAndDraws(id as number, matches);
      const goals = LeaderboardServiceAway.goalsFavor(id as number, matches);
      return { name: teamName,
        totalPoints: totalPoints[0] + losesDraws[1],
        totalGames,
        totalVictories: totalPoints[1],
        totalDraws: losesDraws[1],
        totalLosses: losesDraws[0],
        goalsFavor: goals[0],
        goalsOwn: goals[1],
        goalsBalance: goals[0] - goals[1],
        efficiency: (((totalPoints[0] + losesDraws[1]) / (totalGames * 3)) * 100).toFixed(2) };
    });
    return result;
  }
}
