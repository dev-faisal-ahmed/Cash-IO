import { Router } from 'express';
import { authGuard } from '../../middlewares/auth.guard';
import { validationHandler } from '../../middlewares/validation.handler';
import { lendValidation } from './lend.validation';
import { lendController } from './lend.controller';

export const lendRouter = Router();

lendRouter.post(
  '/',
  authGuard,
  validationHandler(lendValidation.CreateLend),
  lendController.createLend
);
