import { serverReq } from '@/helpers/server-req';
import { signIn, useSession } from 'next-auth/react';

export function useGetUser() {
  const { data } = useSession();

  async function registerWithGoogle() {
    await signIn('google');
    fetch(
      'api/register',
      serverReq('POST', { name: data?.user?.name, email: data?.user?.email }),
    );
  }

  return { user: data?.user, registerWithGoogle };
}
