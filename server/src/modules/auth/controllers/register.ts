import bcrypt from 'bcrypt';
import { BCRYPT_SALT } from '../../../config';
import { asyncHandler } from '../../../middlewares';
import { User } from '../../user/user.model';
import { AppError } from '../../../utils';
import { registerSchema } from '../auth.validation';
import { sendSuccessResponse } from '../../../helpers';

export const register = asyncHandler(async (req, res) => {
  const payload = await registerSchema.parseAsync(req.body);

  const isUserExist = await User.findOne({ email: payload.email });
  if (isUserExist) throw new AppError('User Already Exist', 400);

  const hashedPassword = await bcrypt.hash(payload.password, BCRYPT_SALT);
  const newUser = await User.create({ ...payload, password: hashedPassword });

  const { password, ...restUserInfo } = newUser.toObject();

  return sendSuccessResponse(res, {
    status: 200,
    message: 'User Created Successfully',
    data: restUserInfo,
  });
});
