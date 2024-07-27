'use server';

import { signIn } from '@/auth';
import { defaultLoginRedirect } from '@/routes';
import { AuthError } from 'next-auth';

type TPayload = {
  email: string;
  password: string;
};

export const loginAction = async ({ email, password }: TPayload) => {
  try {
    await signIn('credentials', {
      email,
      password,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid Credentials' };
        default:
          return { error: 'Something Went Wrong' };
      }
    }

    throw error;
  }
};
