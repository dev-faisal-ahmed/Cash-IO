import { StatusCodes } from 'http-status-codes';
import { AppError } from '../utils/app.error';
import { JWT_SECRET } from '../config';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { TryCatch } from '../utils';
import { User } from '../modules/user/model';

export const authGuard = TryCatch(async (req, _, next) => {
  const token = req.headers.authorization;
  if (!token) throw new AppError('No Token Found', StatusCodes.NOT_FOUND);

  const decodedUser = jwt.verify(token, JWT_SECRET as Secret) as JwtPayload;
  if (!decodedUser)
    throw new AppError('Invalid Token', StatusCodes.UNAUTHORIZED);

  const user = await User.findOne({ _id: decodedUser._id });
  if (!user) throw new AppError('No User Found', StatusCodes.NOT_FOUND);

  req.user = user;
  next();
});
