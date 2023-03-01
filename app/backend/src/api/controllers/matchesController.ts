import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';
import IMatchesService from '../interfaces/IMatchesService';

const teamsService = new TeamsService();

export default class MatchesController {
  private _service: IMatchesService;

  constructor(service: IMatchesService) {
    this._service = service;
  }

  public static async validateTeams(teamsIds: number[]) {
    if (teamsIds[0] === teamsIds[1]) {
      return { status: 422, message: 'It is not possible to create a match with two equal teams' };
    }
    const database = await teamsService.findAll();
    const ids = database.map(({ id }) => id);
    if (!teamsIds.every((teamId) => ids.includes(teamId))) {
      return { status: 404, message: 'There is no team with such id!' };
    }
    return { status: null, message: '' };
  }

  async findAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (!inProgress) {
      const result = await this._service.findAll();
      return res.status(200).json(result);
    }
    const test = inProgress === 'true';
    const result = await this._service.findAllInProgress(test);
    return res.status(200).json(result);
  }

  async updateInProgress(req: Request, res: Response) {
    const { id } = req.params;
    await this._service.updateInProgress(Number(id));
    return res.status(200).json({ message: 'Finished' });
  }

  async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this._service.updateMatch(Number(id), Number(homeTeamGoals), Number(awayTeamGoals));
    return res.status(200).json({ message: 'match updated' });
  }

  async createMatch(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const { status, message } = await MatchesController.validateTeams([homeTeamId, awayTeamId]);
    if (status) return res.status(status).json({ message });
    const newMatch = await this._service
      .createMatch(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);
    return res.status(201).json(newMatch);
  }
}
