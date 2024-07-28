import { z } from 'zod';

export const EnumGenerator = (options: string[], message: string) =>
  z.enum([...(options as [string, ...string[]])], { required_error: message });
