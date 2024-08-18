import { JwtPayload } from 'jsonwebtoken';
import { TUser } from './modules/user/interface';

declare global {
  namespace Express {
    interface Request {
      user: TUser;
    }
  }
}
