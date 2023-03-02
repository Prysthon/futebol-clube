import { Request, Response, Router } from 'express';
import LeaderboardControllerAway from '../controllers/LeaderboardControllerAway';

const leaderboardRouterAway = Router();

leaderboardRouterAway.get(
  '/',
  (req: Request, res: Response) => LeaderboardControllerAway.calculatePoints(req, res),
);

export default leaderboardRouterAway;
