import { Router } from 'express';
import { authGuard } from '../../middlewares';
import { categoryController } from './controllers';

export const categoryRouter = Router();
export const categoriesRouter = Router();

// category router
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

// categories router
categoriesRouter.get('/', authGuard, categoryController.getCategories);
