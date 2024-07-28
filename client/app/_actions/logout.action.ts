'use server';

import { cookies } from 'next/headers';

export const logOutAction = async () => {
  cookies().delete('token');
};
