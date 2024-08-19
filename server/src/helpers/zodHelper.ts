import { z } from 'zod';
import { isValidDate } from './generalHelper';

export const enumGenerator = (options: string[], message: string) =>
  z.enum([...(options as [string, ...string[]])], { required_error: message });

export const dateGenerator = (required_error: string) => {
  return z
    .string({ required_error })
    .refine((date) => isValidDate(date), { message: 'Invalid Date' });
};
