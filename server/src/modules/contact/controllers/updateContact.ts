import { sendSuccessResponse } from '../../../helpers';
import { asyncHandler } from '../../../middlewares';
import { AppError } from '../../../utils';
import { TUser } from '../../user/interface';
import { Contact } from '../model';
import { updateContactSchema } from '../validation';

export const updateContact = asyncHandler(async (req, res) => {
  const payload = await updateContactSchema.parseAsync(req.body);
  const user: TUser = req.user;
  const { contactId } = req.params;

  const isContactExist = await Contact.findOneAndUpdate(
    { _id: contactId, userId: user._id },
    { $set: payload }
  );

  if (!isContactExist) throw new AppError('Contact Not Found', 404);

  return sendSuccessResponse(res, {
    status: 200,
    message: 'Contact Updated successfully',
    data: null,
  });
});
