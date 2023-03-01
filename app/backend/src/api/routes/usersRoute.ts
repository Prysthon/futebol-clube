import { Request, Response, Router } from 'express';
import UsersService from '../services/UsersService';
import UsersController from '../controllers/usersController';
import loginMiddleware from '../middlewares/loginMiddleware';
import auth from '../middlewares/auth';

const usersRouter = Router();
const usersService = new UsersService();
const usersController = new UsersController(usersService);

usersRouter.post(
  '/',
  loginMiddleware.checkLoginFields,
  (req: Request, res: Response) => usersController.validateLogin(req, res),
);

usersRouter.get(
  '/role',
  auth.verifyToken,
  (req: Request, res: Response) => UsersController.userRole(req, res),
);

export default usersRouter;
