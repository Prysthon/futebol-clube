import { ModelStatic } from 'sequelize';
import IMatchesService from '../interfaces/IMatchesService';
import Matches from '../../database/models/MatchesModel';
import Teams from '../../database/models/TeamsModel';

export default class MatchesService implements IMatchesService {
  protected model: ModelStatic<Matches> = Matches;

  async findAll(): Promise<Matches[]> {
    const matches = await this.model.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }
}
