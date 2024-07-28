import { AppError, SendSuccessResponse, TryCatch } from '../../../utils';
import { TUser } from '../../user/interface';
import { Contact } from '../model';

export const DeleteContact = TryCatch(async (req, res) => {
  const { contactId } = req.params;
  const user: TUser = req.user;

  const isContactExist = await Contact.findOneAndUpdate(
    { _id: contactId, userId: user._id },
    { $set: { isDeleted: true } }
  );

  if (!isContactExist) throw new AppError('Contact Not Found', 404);

  SendSuccessResponse(res, {
    status: 200,
    message: 'Contact Deleted Successfully',
    data: null,
  });
});
