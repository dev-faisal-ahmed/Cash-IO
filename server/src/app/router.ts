import { Router } from 'express';
import { authRouter } from '../modules/auth/auth.router';
import { categoryRouter } from '../modules/category/category.router';
import { categoriesRouter } from '../modules/category/category.router';
import { contactRouter } from '../modules/contact/contact.router';

export const appRouter = Router();

appRouter.use('/auth', authRouter);
appRouter.use('/category', categoryRouter);
appRouter.use('/categories', categoriesRouter);
appRouter.use('/contact', contactRouter);
