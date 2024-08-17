'use server';

import { apiUrl } from '@/app/_data';
import { tokens } from '@/app/_data/tokens';
import { fetchOption } from '@/app/_utils/helpers';
import { cookies } from 'next/headers';

type TPayload = {
  email: string;
  password: string;
};

export const loginAction = async (payload: TPayload) => {
  const response = await fetch(
    apiUrl.login,
    fetchOption({ method: 'POST', body: payload }),
  );

  const responseData = await response.json();

  if (responseData?.ok) {
    const accessToken = responseData?.data?.accessToken;
    const refreshToken = responseData?.data?.refreshToken;

    if (accessToken) cookies().set(tokens.accessToken, accessToken);
    if (refreshToken) cookies().set(tokens.refreshToken, refreshToken);
  }

  return responseData;
};
