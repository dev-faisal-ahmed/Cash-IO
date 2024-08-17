import bcrypt from 'bcrypt';
import { generateAuthToken, sendSuccessResponse } from '../../../helpers';
import { AppError } from '../../../utils';
import { User } from '../../user/user.model';
import { loginSchema } from '../auth.validation';
import { asyncHandler } from '../../../middlewares';

export const login = asyncHandler(async (req, res) => {
  const payload = await loginSchema.parseAsync(req.body);

  const user = await User.findOne({
    email: payload.email,
    provider: 'CREDENTIALS',
  });

  if (!user) throw new AppError('Invalid Credentials', 400);

  const isPasswordMatch = await bcrypt.compare(
    payload.password,
    user.password!
  );

  if (!isPasswordMatch) throw new AppError('Invalid Credentials', 400);

  const token = generateAuthToken({
    _id: user._id,
    name: user.name,
    email: user.email,
    imageUrl: user?.imageUrl,
  });

  return sendSuccessResponse(res, {
    status: 200,
    message: 'Successfully LoggedIn',
    data: { token },
  });
});
