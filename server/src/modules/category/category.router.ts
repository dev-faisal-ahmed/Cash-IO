import { Router } from 'express';
import { authGuard } from '../../middlewares';
import { categoryController } from './controllers';

export const categoryRouter = Router();

categoryRouter.post('/', authGuard, categoryController.createCategory);

categoryRouter.patch(
  '/:categoryId',
  authGuard,
  categoryController.updateCategory
);

categoryRouter.delete(
  '/:categoryId',
  authGuard,
  categoryController.deleteCategory
);
