import {
  generateAuthToken,
  generateRefreshToken,
  sendSuccessResponse,
} from '../../../helpers';
import bcrypt from 'bcrypt';
import { AppError } from '../../../utils';
import { User } from '../../user/user.model';
import { loginSchema } from '../auth.validation';
import { asyncHandler } from '../../../middlewares';

export const login = asyncHandler(async (req, res) => {
  // validation
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

  const { _id, name, email, imageUrl } = user;

  const accessToken = generateAuthToken({ _id, name, email, imageUrl });
  const refreshToken = generateRefreshToken({ _id, email });

  // response
  return sendSuccessResponse(res, {
    status: 200,
    message: 'Successfully LoggedIn',
    data: { accessToken, refreshToken },
  });
});
