import { Router } from 'express';
import { authGuard } from '../../middlewares';
import { contactController } from './controllers';

export const contactRouter = Router();

contactRouter.post('/', authGuard, contactController.createContact);
contactRouter.patch('/:contactId', authGuard, contactController.updateContact);
contactRouter.delete('/:contactId', authGuard, contactController.deleteContact);
