import bcrypt from 'bcrypt';
import { BCRYPT_SALT } from '../../../config';
import { asyncHandler } from '../../../middlewares';
import { User } from '../../user/user.model';
import { registerSchema } from '../auth.validation';
import { sendSuccessResponse } from '../../../helpers';

export const register = asyncHandler(async (req, res) => {
  // validation
  const payload = await registerSchema.parseAsync(req.body);

  const hashedPassword = await bcrypt.hash(payload.password, BCRYPT_SALT);
  const newUser = await User.create({ ...payload, password: hashedPassword });

  const { password, ...restUserInfo } = newUser.toObject();

  // response
  return sendSuccessResponse(res, {
    status: 200,
    message: 'User Created Successfully',
    data: restUserInfo,
  });
});
