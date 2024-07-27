import { JWT_SECRET } from '../config';
import { TAuthInfo } from '../utils';
import jwt from 'jsonwebtoken';

export const generateAuthToken = (payload: TAuthInfo) => {
  const token = jwt.sign(payload, JWT_SECRET!);
  return token;
};
