import { Router } from 'express';
import { AuthRouter } from '../modules/auth/router';

export const AppRouter = Router();
AppRouter.use('/auth', AuthRouter);
