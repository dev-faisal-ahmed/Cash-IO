import { Router } from 'express';
import { authGuard } from '../../middlewares/auth.guard';
import { validationHandler } from '../../middlewares/validation.handler';
import { transactionValidation } from './transaction.validation';
import { transactionController } from './transaction.controller';

export const transactionRouter = Router();

transactionRouter.post(
  '/',
  authGuard,
  validationHandler(transactionValidation.CreateTransaction),
  transactionController.createTransaction
);

transactionRouter.get('/', authGuard, transactionController.getTransactions);
