import { Router } from 'express';
import { validationHandler } from '../../middlewares/validation.handler';
import { userValidation } from './user.validation';
import { userController } from './user.controller';
import { authGuard } from '../../middlewares/auth.guard';

export const userRouter = Router();

userRouter.post(
  '/register',
  validationHandler(userValidation.RegisterUser),
  userController.registerUser
);

userRouter.post(
  '/login',
  validationHandler(userValidation.LoginUser),
  userController.loginUser
);

userRouter.patch(
  '/',
  authGuard,
  validationHandler(userValidation.UpdateProfile),
  userController.updateProfile
);
