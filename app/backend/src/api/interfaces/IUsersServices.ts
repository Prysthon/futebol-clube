import IUser from './IUser';
import IValidadeLogin from './IValidadeLogin';

export default interface IUsersService {
  validateLogin(Users: IUser): Promise<IValidadeLogin>,
}
