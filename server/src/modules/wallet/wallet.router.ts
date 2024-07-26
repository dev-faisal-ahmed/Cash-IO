import { Router } from 'express';
import { authGuard } from '../../middlewares/auth.guard';
import { validationHandler } from '../../middlewares/validation.handler';
import { walletValidation } from './wallet.validation';
import { walletController } from './wallet.controller';

export const walletRouter = Router();

walletRouter.post(
  '/',
  authGuard,
  validationHandler(walletValidation.CreateWallet),
  walletController.createWallet
);

walletRouter.get('/', authGuard, walletController.getWallets);
walletRouter.get('/:walletId', authGuard, walletController.getWallet);

walletRouter.patch(
  '/:walletId',
  authGuard,
  validationHandler(walletValidation.EditWallet),
  walletController.editWallet
);
