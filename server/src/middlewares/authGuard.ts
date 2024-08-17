import { AppError } from '../utils/appError';
import { JWT_SECRET } from '../config';
import { User } from '../modules/user/user.model';
import { asyncHandler } from './asyncHandler';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const BEARER = 'Bearer';

export const authGuard = asyncHandler(async (req, _, next) => {
  const authToke = req.headers.authorization;
  if (!authToke) throw new AppError('No Token Found', 400);

  const [bearer, token] = authToke.split(' ');
  if (bearer.toLocaleLowerCase() !== BEARER.toLocaleLowerCase())
    throw new AppError('invalid token formate', 401);

  const decodedUser = jwt.verify(token, JWT_SECRET as Secret) as JwtPayload;
  if (!decodedUser) throw new AppError('Invalid Token', 401);

  const user = await User.findOne({ _id: decodedUser._id });
  if (!user) throw new AppError('No User Found', 404);

  req.user = user;
  next();
});
