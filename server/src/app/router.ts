import { Router } from 'express';
import { authRouter } from '../modules/auth/router';
import { categoryRouter } from '../modules/category/router';
import { categoriesRouter } from '../modules/category/router';
import { contactRouter } from '../modules/contact/router';
import { walletRouter } from '../modules/wallet/router';
import { transactionRouter } from '../modules/transactions/router';

export const appRouter = Router();

appRouter.use('/auth', authRouter);
appRouter.use('/category', categoryRouter);
appRouter.use('/categories', categoriesRouter);
appRouter.use('/contact', contactRouter);
appRouter.use('/wallet', walletRouter);
appRouter.use('/transaction', transactionRouter);
