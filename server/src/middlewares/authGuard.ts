import jwt, { JwtPayload } from 'jsonwebtoken';
import { AppError } from '../utils/appError';
import { User } from '../modules/user/model';
import { catchAsync } from './catchAsync';
import { ACCESS_TOKEN_SECRET } from '../app/config';

const BEARER = 'Bearer';

export const authGuard = catchAsync(async (req, _, next) => {
  const authToke = req.headers.authorization;
  if (!authToke) throw new AppError('No Token Found', 400);

  const [bearer, token] = authToke.split(' ');
  if (bearer.toLocaleLowerCase() !== BEARER.toLocaleLowerCase())
    throw new AppError('invalid token formate', 401);

  const decodedUser = jwt.verify(token, ACCESS_TOKEN_SECRET!) as JwtPayload;
  if (!decodedUser) throw new AppError('Invalid Token', 401);

  const user = await User.findOne({ _id: decodedUser._id });
  if (!user) throw new AppError('No User Found', 404);

  req.user = user;
  next();
});
