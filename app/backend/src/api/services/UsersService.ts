import { ModelStatic } from 'sequelize';
import bcrypt = require('bcryptjs');
import IUsersService from '../interfaces/IUsersServices';
import Users from '../../database/models/UsersModel';
import IUser from '../interfaces/IUser';
import JwtToken from './jwt';
import IValidadeLogin from '../interfaces/IValidadeLogin';

export default class UsersService implements IUsersService {
  protected model: ModelStatic<Users> = Users;
  private _jwt: JwtToken = new JwtToken();

  async validateLogin(user: IUser): Promise<IValidadeLogin> {
    const error = { type: 'error', payload: 'Invalid email or password' };
    const emailRegex = /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    if (!emailRegex.test(user.email)) return error;
    if (user.password.length < 6) return error;

    const userFound = await this.model.findOne({
      where: {
        email: user.email,
      },
    });

    if (!userFound) return error;

    if (!await bcrypt.compare(user.password, userFound.password)) return error;

    const token = this._jwt.createToken({ role: userFound.role });
    return { type: null, payload: token };
  }
}
