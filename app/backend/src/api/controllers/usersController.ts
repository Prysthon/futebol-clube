import { Request, Response } from 'express';
import IUserService from '../interfaces/IUsersServices';

export default class UsersController {
  private _service: IUserService;

  constructor(service: IUserService) {
    this._service = service;
  }

  async validateLogin(req: Request, res: Response) {
    const { type, payload } = await this._service.validateLogin(req.body);
    if (type) return res.status(401).json({ message: payload });
    return res.status(200).json({ token: payload });
  }

  static async userRole(req: Request, res: Response) {
    const { role } = req.body;
    return res.status(200).json(role);
  }
}
