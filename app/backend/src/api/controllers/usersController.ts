import { Request, Response } from 'express';
import IUserService from '../interfaces/IUsersServices';

export default class UsersController {
  private _service: IUserService;

  constructor(service: IUserService) {
    this._service = service;
  }

  async validateLogin(req: Request, res: Response) {
    const result = await this._service.validateLogin(req.body);
    return res.status(200).json({ token: result });
  }
}
