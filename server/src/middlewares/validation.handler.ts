import { AnyZodObject } from 'zod';
import { tryCatch } from '../utils/try-catch';

export const validationHandler = (schema: AnyZodObject) => {
  return tryCatch(async (req, _, next) => {
    const data = await schema.parseAsync(req.body);
    req.body = data;
    next();
  });
};
