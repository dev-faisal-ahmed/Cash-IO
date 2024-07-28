import { Router } from 'express';
import { ValidationHandler } from '../../middlewares';
import { AuthValidation } from './validation';
import { AuthController } from './controllers';

export const AuthRouter = Router();

AuthRouter.post(
  '/register',
  ValidationHandler(AuthValidation.SRegister),
  AuthController.Register
);

AuthRouter.post(
  '/login',
  ValidationHandler(AuthValidation.SLogin),
  AuthController.Login
);

AuthRouter.post(
  '/login/google',
  ValidationHandler(AuthValidation.SGoogleLogin),
  AuthController.GoogleLogin
);
