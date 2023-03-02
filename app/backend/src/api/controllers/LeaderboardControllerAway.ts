import { Request, Response } from 'express';
import ITeamService from '../interfaces/ITeamsServices';
import LeaderboardServiceAway from '../services/LeaderBoardServiceAway';
import MatchesService from '../services/MatchesService';
import TeamService from '../services/TeamsService';

const teamService = new TeamService();
const matchesService = new MatchesService();

export default class LeaderboardControllerAway {
  private _service: ITeamService;

  constructor(service: ITeamService) {
    this._service = service;
  }

  static async calculatePoints(req: Request, res: Response) {
    const teams = await teamService.findAll();
    const allMatches = await matchesService.findAll();

    const matches = allMatches.filter(({ inProgress }) => inProgress === false);

    const matchesWithVictories = matches.map(({ dataValues }) => {
      if (dataValues.homeTeamGoals < dataValues.awayTeamGoals) {
        return { ...dataValues, victory: dataValues.awayTeamId };
      }
      return { ...dataValues, victory: 0 };
    });

    const result = LeaderboardServiceAway.calculatePoints(teams, matchesWithVictories);
    const sortered = result.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);
    return res.status(200).json(sortered);
  }
}
