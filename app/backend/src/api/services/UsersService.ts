import { ModelStatic } from 'sequelize';
import IUsersService from '../interfaces/IUsersServices';
import Users from '../../database/models/UsersModel';
import IUser from '../interfaces/IUser';
import JwtToken from './jwt';

export default class UsersService implements IUsersService {
  protected model: ModelStatic<Users> = Users;
  private _jwt: JwtToken = new JwtToken();

  async validateLogin(user: IUser): Promise<string | null> {
    const userFound = await this.model.findOne({
      where: {
        email: user.email,
      },
    });

    if (!userFound) return userFound;

    const token = this._jwt.createToken({ email: user.email });
    return token;
  }
}
