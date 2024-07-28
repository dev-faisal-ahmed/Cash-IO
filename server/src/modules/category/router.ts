import { Router } from 'express';
import { AuthGuard, ValidationHandler } from '../../middlewares';
import { CategoryValidation } from './validation';
import { CategoryController } from './controllers';

export const CategoryRouter = Router();

CategoryRouter.post(
  '/',
  AuthGuard,
  ValidationHandler(CategoryValidation.SCreateCategory),
  CategoryController.CreateCategory
);
