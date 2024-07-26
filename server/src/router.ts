import { Router } from 'express';
import { userRouter } from './modules/user/user.router';
import { sourceRouter } from './modules/source/source.router';
import { walletRouter } from './modules/wallet/wallet.router';
import { transactionRouter } from './modules/transactions/transaction.router';
import { contactRouter } from './modules/contact/contact.router';
import { lendRouter } from './modules/lend/lend.router';
import { transferRouter } from './modules/transfer/transfer.router';
import { metaRouter } from './modules/meta/meta.router';

export const appRouter = Router();

appRouter.use('/auth', userRouter);
appRouter.use('/source', sourceRouter);
appRouter.use('/wallet', walletRouter);
appRouter.use('/transaction', transactionRouter);
appRouter.use('/contact', contactRouter);
appRouter.use('/lend', lendRouter);
appRouter.use('/transfer', transferRouter);
appRouter.use('/meta', metaRouter);
