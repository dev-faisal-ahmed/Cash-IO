import { Router } from 'express';
import { authGuard } from '../../middlewares/auth.guard';
import { validationHandler } from '../../middlewares/validation.handler';
import { transferController } from './transfer.controller';
import { transferValidation } from './transfer.validation';

export const transferRouter = Router();

transferRouter.post(
  '/',
  authGuard,
  validationHandler(transferValidation.CreateTransfer),
  transferController.createTransfer
);

transferRouter.get('/', authGuard, transferController.getTransfers);
