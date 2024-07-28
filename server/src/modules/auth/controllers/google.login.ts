import { AppError, SendSuccessResponse, TryCatch } from '../../../utils';
import { TGoogleLoginPayload } from '../validation';
import { generateAuthToken } from '../../../helpers';
import { User } from '../../user/model';

export const GoogleLogin = TryCatch(async (req, res) => {
  const { email, name, imageUrl }: TGoogleLoginPayload = req.body;

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

  SendSuccessResponse(res, {
    status: 200,
    message: 'Successfully Logged In',
    data: { token },
  });
});
