import { AppError } from '../../../utils';
import { generateAuthToken, sendSuccessResponse } from '../../../helpers';
import { googleLoginSchema } from '../auth.validation';
import { asyncHandler } from '../../../middlewares';
import { User } from '../../user/user.model';

export const googleLogin = asyncHandler(async (req, res) => {
  const { email, name, imageUrl } = await googleLoginSchema.parseAsync(
    req.body
  );

  const isUserExist = await User.findOne({ email });
  let token: string;

  if (isUserExist) {
    // user already exist
    token = generateAuthToken({
      _id: isUserExist._id,
      email,
      name: isUserExist.email,
      imageUrl: isUserExist.imageUrl,
    });
  } else {
    // creating new user
    const user = await User.create({
      email,
      name,
      imageUrl,
      provider: 'GOOGLE',
    });
    if (!user) throw new AppError('Failed to create the account', 400);

    token = generateAuthToken({ _id: user._id, email, name, imageUrl });
  }

  return sendSuccessResponse(res, {
    status: 200,
    message: 'Successfully Logged In',
    data: { token },
  });
});
