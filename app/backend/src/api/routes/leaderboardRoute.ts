import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRouter = Router();

leaderboardRouter.get(
  '/',
  (req: Request, res: Response) => LeaderboardController.calculatePoints(req, res),
);

export default leaderboardRouter;
