import { AppError, SendSuccessResponse, TryCatch } from '../../../utils';
import { TUser } from '../../user/interface';
import { Contact } from '../model';
import { TCreateContactPayload } from '../validation';

export const CreateContact = TryCatch(async (req, res) => {
  const payload: TCreateContactPayload = req.body;
  const user: TUser = req.user;

  const contact = await Contact.findOne({
    userId: user._id,
    phone: payload.phone,
  });

  if (contact) throw new AppError('Contact already exist', 400);

  const newContact = await Contact.create({ ...payload, userId: user._id });
  if (!newContact) throw new AppError('Failed to create new contact', 400);

  SendSuccessResponse(res, {
    status: 200,
    message: 'Contact Created',
    data: newContact,
  });
});
