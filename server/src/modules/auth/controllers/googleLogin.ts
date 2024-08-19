import {
  generateAuthToken,
  generateRefreshToken,
  sendSuccessResponse,
} from '../../../helpers';
import { AppError } from '../../../utils';
import { User } from '../../user/model';
import { catchAsync } from '../../../middlewares';
import { googleLoginSchema } from '../validation';

export const googleLogin = catchAsync(async (req, res) => {
  // validation
  const payload = await googleLoginSchema.parseAsync(req.body);
  const { email, name, imageUrl } = payload;

  const isUserExist = await User.findOne({ email, provider: 'GOOGLE' });
  let accessToken: string;
  let refreshToken: string;

  if (isUserExist) {
    // user already exists
    const { _id, name, imageUrl } = isUserExist;
    accessToken = generateAuthToken({ _id, email, name, imageUrl });
    refreshToken = generateRefreshToken({ _id, email });
  } else {
    // if user does not exist
    // creating new user
    const user = await User.create({
      email,
      name,
      imageUrl,
      provider: 'GOOGLE',
    });

    if (!user) throw new AppError('Failed to create the account', 400);
    const { _id } = user;

    accessToken = generateAuthToken({ _id, email, name, imageUrl });
    refreshToken = generateRefreshToken({ _id, email });
  }

  // response
  return sendSuccessResponse(res, {
    status: 200,
    message: 'Successfully Logged In',
    data: { accessToken, refreshToken },
  });
});
