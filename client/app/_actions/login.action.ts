'use server';

import { signIn } from '@/auth';
import { defaultLoginRedirect } from '@/routes';

type TPayload = {
  email: string;
  password: string;
};

export const loginAction = async ({ email, password }: TPayload) => {
  // try {
  //   await signIn('credentials', {
  //     email,
  //     password,
  //     redirectTo: defaultLoginRedirect,
  //   });
  // }
};
