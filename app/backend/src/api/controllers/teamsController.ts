import { Request, Response } from 'express';
import ITeamService from '../interfaces/ITeamsServices';

export default class TeamController {
  private _service: ITeamService;

  constructor(service: ITeamService) {
    this._service = service;
  }

  async findAll(req: Request, res: Response) {
    const result = await this._service.findAll();
    return res.status(200).json(result);
  }

  async findById(req: Request, res: Response) {
    // console.log('TESTEEEEEEEEEEEEEEEEEEEEEEEEEEEE\n',req.params.id)
    const result = await this._service.findById(Number(req.params.id));
    return res.status(200).json(result);
  }
}
