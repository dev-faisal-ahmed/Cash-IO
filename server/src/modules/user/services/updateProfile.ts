import { AppError } from '../../../utils/app.error';
import { TUser } from '../user.interface';
import { User } from '../user.model';
import { TUpdateProfilePayload } from '../user.validation';

export const updateProfile = async (
  user: TUser,
  payload: TUpdateProfilePayload
) => {
  //checking if the user exist or not
  const isUserExist = await User.findOne({ _id: user._id });
  if (!isUserExist) throw new AppError('User not found', 404);

  const updatedInfo = await User.updateOne({ _id: user._id }, { ...payload });
  return updatedInfo;
};
