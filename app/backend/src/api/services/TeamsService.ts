import { ModelStatic } from 'sequelize';
import ITeamService from '../interfaces/ITeamsServices';
import Team from '../../database/models/TeamsModel';

export default class TeamService implements ITeamService {
  protected model: ModelStatic<Team> = Team;

  async findAll(): Promise<Team[]> {
    const teams = await this.model.findAll();
    return teams;
  }
}
