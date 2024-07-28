import { AppError, SendSuccessResponse, TryCatch } from '../../../utils';
import { TUser } from '../../user/interface';
import { Contact } from '../model';
import { TUpdateContactPayload } from '../validation';

export const UpdateContact = TryCatch(async (req, res) => {
  const payload: TUpdateContactPayload = req.body;
  const user: TUser = req.user;
  const { contactId } = req.params;

  const isContactExist = await Contact.findOneAndUpdate(
    { _id: contactId, userId: user._id },
    { $set: payload }
  );

  if (!isContactExist) throw new AppError('Contact Not Found', 404);

  SendSuccessResponse(res, {
    status: 200,
    message: 'Contact Updated successfully',
    data: null,
  });
});
