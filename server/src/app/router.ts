import { Router } from 'express';
import { AuthRouter } from '../modules/auth/router';
import { CategoryRouter } from '../modules/category/router';

export const AppRouter = Router();

AppRouter.use('/auth', AuthRouter);
AppRouter.use('/category', CategoryRouter);
