'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { tokens } from '../_data/tokens';
import { jwtDecode } from 'jwt-decode';
import { TLoggedUser } from '../_utils/types';

export const authGuard = async () => {
  const accessToken = cookies().get(tokens.accessToken)?.value;
  if (!accessToken) redirect('/auth/login');

  const decodedUser = jwtDecode(accessToken) as TLoggedUser;
  if (!decodedUser) redirect('/auth/login');

  return decodedUser;
};

export const guardLoggedUser = async () => {
  const accessToken = cookies().get(tokens.accessToken)?.value;
  if (!accessToken) return;

  const user = jwtDecode(accessToken);
  if (!user) return;

  redirect('/');
};
