import { sendSuccessResponse } from '../../../helpers';
import { asyncHandler } from '../../../middlewares';
import { AppError } from '../../../utils';
import { TUser } from '../../user/user.interface';
import { Contact } from '../contact.model';
import { createContactSchema } from '../contact.validation';

export const createContact = asyncHandler(async (req, res) => {
  const payload = await createContactSchema.parseAsync(req.body);
  const user: TUser = req.user;

  const newContact = await Contact.create({ ...payload, userId: user._id });
  if (!newContact) throw new AppError('Failed to create new contact', 400);

  return sendSuccessResponse(res, {
    status: 200,
    message: 'Contact Created',
    data: newContact,
  });
});
