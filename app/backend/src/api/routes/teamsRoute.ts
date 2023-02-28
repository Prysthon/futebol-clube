import { Request, Response, Router } from 'express';
import TeamService from '../services/TeamsService';
import TeamController from '../controllers/teamsController';

const teamRouter = Router();
const teamService = new TeamService();
const teamController = new TeamController(teamService);

teamRouter.get(
  '/',
  (req: Request, res: Response) => teamController.findAll(req, res),
);

export default teamRouter;
