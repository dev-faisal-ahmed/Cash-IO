'use server';

import { cookies } from 'next/headers';
import { tokens } from '../_data/tokens';

export const getAccessTokenAction = () => {
  const accessToken = cookies().get(tokens.accessToken)?.value;
  return accessToken;
};

export const getNewAccessTokenAction = () => {
  const accessToken = cookies().get(tokens.accessToken)?.value;
  return accessToken;
};
