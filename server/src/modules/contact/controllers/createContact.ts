import { sendSuccessResponse } from '../../../helpers';
import { catchAsync } from '../../../middlewares';
import { AppError } from '../../../utils';
import { TUser } from '../../user/interface';
import { Contact } from '../model';
import { createContactSchema } from '../validation';

export const createContact = catchAsync(async (req, res) => {
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
