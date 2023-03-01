import IMatches from './IMatches';

export default interface IMatchesService {
  findAll(): Promise<IMatches[]>
}
