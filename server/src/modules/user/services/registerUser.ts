import { TRegistrationPayload } from '../user.validation';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../../utils/app.error';
import { User } from '../user.model';
import { JWT_SECRET } from '../../../config';
import jwt from 'jsonwebtoken';

export const registerUser = async (payload: TRegistrationPayload) => {
  // checking if this user exist or not
  const isUserExist = await User.findOne({ email: payload.email });

  if (isUserExist)
    throw new AppError('User Already Exist', StatusCodes.BAD_REQUEST);

  const newUser = await User.create(payload);

  const token = jwt.sign(
    { email: newUser.email, _id: newUser._id, name: newUser.name },
    JWT_SECRET!,
    { expiresIn: '30d' }
  );

  return { ...newUser, token };
};
