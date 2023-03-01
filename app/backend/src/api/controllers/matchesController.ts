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
}
