import { BCRYPT_SALT } from '../../../config';
import { AppError, SendSuccessResponse, TryCatch } from '../../../utils';
import { User } from '../../user/model';
import { TRegisterPayload } from '../validation';
import bcrypt from 'bcrypt';

export const Register = TryCatch(async (req, res) => {
  const payload: TRegisterPayload = req.body;

  const isUserExist = await User.findOne({ email: payload.email });
  if (isUserExist) throw new AppError('User Already Exist', 400);

  const hashedPassword = await bcrypt.hash(payload.password, BCRYPT_SALT);
  const newUser = await User.create({ ...payload, password: hashedPassword });

  const { password, ...restUserInfo } = newUser.toObject();

  SendSuccessResponse(res, {
    status: 200,
    message: 'User Created Successfully',
    data: restUserInfo,
  });
});
