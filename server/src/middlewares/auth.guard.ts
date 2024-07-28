import { AppError } from '../utils/app.error';
import { JWT_SECRET } from '../config';
import { TryCatch } from '../utils';
import { User } from '../modules/user/model';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const BEARER = 'Bearer';

export const AuthGuard = TryCatch(async (req, _, next) => {
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
