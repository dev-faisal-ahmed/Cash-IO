import { Router } from 'express';
import { authGuard } from '../../middlewares';
import { walletController } from './controllers';

export const walletRouter = Router();

walletRouter.post('/', authGuard, walletController.addWallet);
