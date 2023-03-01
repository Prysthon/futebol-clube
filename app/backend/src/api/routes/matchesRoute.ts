import { Request, Response, Router } from 'express';
import MatchesService from '../services/MatchesService';
import MatchesController from '../controllers/matchesController';

const matchesRouter = Router();
const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

matchesRouter.get(
  '/',
  (req: Request, res: Response) => matchesController.findAll(req, res),
);

export default matchesRouter;
