'use server';

import { cookies } from 'next/headers';
import { tokens } from '../_data/tokens';
import { jwtDecode } from 'jwt-decode';
import { TLoggedUser } from '../_utils/types';

export const getUserAction = async () => {
  const accessToken = cookies().get(tokens.accessToken)?.value;
  if (!accessToken) return null;

  const decodedUser = jwtDecode(accessToken);
  return decodedUser as TLoggedUser;
};
