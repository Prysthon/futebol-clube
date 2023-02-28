import IUser from './IUser';

export default interface IUsersService {
  validateLogin(Users: IUser): Promise<string | null>,
}
