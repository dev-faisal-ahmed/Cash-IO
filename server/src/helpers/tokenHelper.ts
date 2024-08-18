import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../app/config';
import { TAuthInfo } from '../utils';
import jwt from 'jsonwebtoken';

export const generateAuthToken = (payload: TAuthInfo) => {
  const token = jwt.sign(payload, ACCESS_TOKEN_SECRET!);
  return token;
};

export const generateRefreshToken = (
  payload: Pick<TAuthInfo, '_id' | 'email'>
) => {
  const token = jwt.sign(payload, REFRESH_TOKEN_SECRET!);
  return token;
};
