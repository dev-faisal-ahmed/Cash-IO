'use server';

import { cookies } from 'next/headers';
import { tokens } from '../_data/tokens';

export const getAccessTokenAction = async () => {
  const accessToken = cookies().get(tokens.accessToken)?.value;
  return accessToken;
};

export const getNewAccessTokenAction = async () => {
  const accessToken = cookies().get(tokens.accessToken)?.value;
  return accessToken;
};
