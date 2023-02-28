import Teams from '../../database/models/TeamsModel';

export default interface ITeamsServices {
  findAll(): Promise<Teams[]>,
  findById(id: number): Promise<Teams>,
}
