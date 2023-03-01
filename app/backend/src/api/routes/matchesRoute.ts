import { Request, Response, Router } from 'express';
import MatchesService from '../services/MatchesService';
import MatchesController from '../controllers/matchesController';
import auth from '../middlewares/auth';

const matchesRouter = Router();
const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

matchesRouter.get(
  '/',
  (req: Request, res: Response) => matchesController.findAll(req, res),
);

matchesRouter.patch(
  '/:id/finish',
  auth.verifyToken,
  (req: Request, res: Response) => matchesController.updateInProgress(req, res),
);

export default matchesRouter;
