import { Request, Response } from 'express';
import IMatchesService from '../interfaces/IMatchesService';

export default class MatchesController {
  private _service: IMatchesService;

  constructor(service: IMatchesService) {
    this._service = service;
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
    const newMatch = await this._service
      .createMatch(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);
    return res.status(201).json(newMatch);
  }
}
