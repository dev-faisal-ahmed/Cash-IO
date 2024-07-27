'use server';

import { signOut } from '@/auth';
import { cookies } from 'next/headers';

export const logOutAction = async () => {
  await signOut();
  cookies().delete('token');
};
