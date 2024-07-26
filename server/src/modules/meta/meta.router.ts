import { Router } from 'express';
import { authGuard } from '../../middlewares/auth.guard';
import { metaController } from './meta.controller';

export const metaRouter = Router();

metaRouter.get('/', authGuard, metaController.getMetaData);
