import { ModelStatic } from 'sequelize';
import IMatchesService from '../interfaces/IMatchesService';
import Matches from '../../database/models/MatchesModel';
import Teams from '../../database/models/TeamsModel';
import IMatches from '../interfaces/IMatches';

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

  async findAllInProgress(inProgress: boolean): Promise<Matches[]> {
    const matches = await this.model.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
      where: {
        inProgress,
      },
    });
    return matches;
  }

  async updateInProgress(id: number): Promise<void> {
    await this.model.update(
      { inProgress: false },
      { where: { id } },
    );
  }

  async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<void> {
    await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
  }

  async createMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<IMatches> {
    const { id } = await this.model.create({
      homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress: true,
    });
    return {
      id, homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress: true,
    };
  }
}
