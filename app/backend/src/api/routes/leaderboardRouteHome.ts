import { Request, Response, Router } from 'express';
import LeaderboardControllerHome from '../controllers/LeaderboardControllerHome';

const leaderboardRouterHome = Router();

leaderboardRouterHome.get(
  '/',
  (req: Request, res: Response) => LeaderboardControllerHome.calculatePoints(req, res),
);

export default leaderboardRouterHome;
