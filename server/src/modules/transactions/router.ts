import { Router } from 'express';
import { authGuard } from '../../middlewares';
import { transactionController } from './controllers';

export const transactionRouter = Router();

transactionRouter.post('/', authGuard, transactionController.addTransaction);

transactionRouter.patch(
  '/:transactionId',
  authGuard,
  transactionController.updateTransaction
);
