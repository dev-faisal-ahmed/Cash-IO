import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../../utils/app.error';
import { TUser } from '../../user/user.interface';
import { Contact } from '../contact.model';
import { TCreateContactPayload } from '../contact.validation';

export const createContact = async (
  user: TUser,
  payload: TCreateContactPayload
) => {
  const userId = user._id;

  // checking is the contact is already created or not
  const isContactExist = await Contact.findOne({
    userId,
    phone: payload.phone,
  });

  if (isContactExist)
    throw new AppError('Contact Already Exist', StatusCodes.BAD_REQUEST);

  const newContact = await Contact.create({ ...payload, userId });
  return newContact;
};
