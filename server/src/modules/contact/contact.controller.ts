import { StatusCodes } from 'http-status-codes';
import { sendSuccessResponse } from '../../utils/response.helper';
import { tryCatch } from '../../utils/try-catch';
import { contactServices } from './services/contact.services';

const createContact = tryCatch(async (req, res) => {
  const newContact = await contactServices.createContact(req.user, req.body);

  sendSuccessResponse(res, {
    status: StatusCodes.OK,
    message: 'Contact successfully added',
    data: newContact,
  });
});

export const contactController = { createContact };
