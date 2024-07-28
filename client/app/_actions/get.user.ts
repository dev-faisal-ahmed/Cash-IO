'use server';

import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { TUser } from '../_types';

export const getUser = async () => {
  const token = cookies().get('token')?.value;
  if (!token) return null;

  const user = jwtDecode(token);
  if (!user) null;
  return user as TUser;
};
