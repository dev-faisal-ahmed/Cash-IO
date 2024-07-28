import { Router } from 'express';
import { AuthGuard, ValidationHandler } from '../../middlewares';
import { ContactValidation } from './validation';
import { ContactController } from './controllers';

export const ContactRouter = Router();

ContactRouter.post(
  '/',
  AuthGuard,
  ValidationHandler(ContactValidation.SCreateContact),
  ContactController.CreateContact
);

ContactRouter.patch(
  '/:contactId',
  AuthGuard,
  ValidationHandler(ContactValidation.SUpdateContact),
  ContactController.UpdateContact
);

ContactRouter.delete('/:contactId', AuthGuard, ContactController.DeleteContact);
