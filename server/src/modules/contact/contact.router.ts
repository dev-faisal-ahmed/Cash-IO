import { Router } from 'express';
import { authGuard } from '../../middlewares/auth.guard';
import { validationHandler } from '../../middlewares/validation.handler';
import { contactValidation } from './contact.validation';
import { contactController } from './contact.controller';

export const contactRouter = Router();

contactRouter.post(
  '/',
  authGuard,
  validationHandler(contactValidation.CreateContact),
  contactController.createContact
);
