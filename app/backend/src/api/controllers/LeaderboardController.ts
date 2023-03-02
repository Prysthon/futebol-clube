import { Request, Response } from 'express';
import ITeamService from '../interfaces/ITeamsServices';
import LeaderboardService from '../services/LeaderBoardService';
import MatchesService from '../services/MatchesService';
import TeamService from '../services/TeamsService';

const teamService = new TeamService();
const matchesService = new MatchesService();

export default class LeaderboardController {
  private _service: ITeamService;

  constructor(service: ITeamService) {
    this._service = service;
  }

  static async calculatePoints(req: Request, res: Response) {
    const teams = await teamService.findAll();
    const matches = await matchesService.findAll();

    const matchesWithVictories = matches.map((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        return { ...match, victory: match.homeTeamId };
      }
      if (match.awayTeamGoals > match.homeTeamGoals) {
        return { ...match, victory: match.awayTeamId };
      }
      return { ...match, victory: 0 };
    });

    const result = LeaderboardService.calculatePoints(teams, matchesWithVictories);
    return res.status(200).json(result);
  }
}
