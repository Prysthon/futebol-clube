import * as express from 'express';
import leaderboardRouterHome from './api/routes/leaderboardRouteHome';
import leaderboardRouterAway from './api/routes/leaderboardRouteAway';
import matchesRouter from './api/routes/matchesRoute';
import teamsRoutes from './api/routes/teamsRoute';
import usersRouter from './api/routes/usersRoute';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.initRoutes();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }

  private initRoutes(): void {
    this.app.use('/teams', teamsRoutes);
    this.app.use('/login', usersRouter);
    this.app.use('/matches', matchesRouter);
    this.app.use('/leaderboard/home', leaderboardRouterHome);
    this.app.use('/leaderboard/away', leaderboardRouterAway);
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
