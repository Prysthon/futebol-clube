import IMatches from './IMatches';

export default interface IMatchesService {
  findAll(): Promise<IMatches[]>,
  findAllInProgress(inProgress: boolean): Promise<IMatches[]>,
}
