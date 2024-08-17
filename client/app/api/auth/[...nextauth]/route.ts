import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { apiUrl } from '@/app/_data';
import { fetchOption } from '@/app/_utils/helpers';
import { cookies } from 'next/headers';
import { tokens } from '@/app/_data/tokens';

const handler = NextAuth({
  providers: [
    Google({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET!,
    }),
  ],

  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,

  callbacks: {
    async signIn({ user }) {
      if (!user) throw new Error('Failed to login');

      // creating a new user or getting the userinfo
      const userInfo = {
        name: user.name,
        email: user.email,
        imageUrl: user.image,
      };

      const response = await fetch(
        apiUrl.googleLogin,
        fetchOption({ method: 'POST', body: userInfo }),
      );

      const responseData = await response.json();

      if (!responseData.ok || !responseData.data)
        throw new Error(responseData.message);

      const accessToken = responseData?.data?.accessToken;
      const refreshToken = responseData?.data?.refreshToken;

      if (accessToken) cookies().set(tokens.accessToken, accessToken);
      if (refreshToken) cookies().set(tokens.refreshToken, refreshToken);

      return true;
    },
  },
});

export { handler as GET, handler as POST };
