import Credentials from 'next-auth/providers/credentials';
import { NextAuthConfig, User } from 'next-auth';
import { serverAddress } from './app/_data';
import { TServerResponse } from './app/_types';
import { fetchOption } from './app/_helpers';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';

export const authConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;

        const response = await fetch(
          `${serverAddress}/auth/login`,
          fetchOption({ method: 'POST', body: { email, password } }),
        );

        const responseData: TServerResponse<any> = await response.json();
        if (!responseData.ok) return null;

        const token = responseData.data.token;
        const userInfo = jwtDecode(token);
        if (!userInfo) return null;

        cookies().set('token', token);
        return userInfo as User;
      },
    }),
  ],
} satisfies NextAuthConfig;
