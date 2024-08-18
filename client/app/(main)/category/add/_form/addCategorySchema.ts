import { z } from 'zod';

export const addCategorySchema = z.object({
  name: z.string({ required_error: 'Category name is required' }),
  type: z.string({ required_error: 'CategoryType is required' }),
  icon: z.string({ required_error: 'Icon is required' }),
  budget: z
    .string()
    .refine((val) => Number(val) > 0, {
      message: 'Minimum budget is more than 0',
    })
    .optional(),
});

export type TAddCategorySchema = z.infer<typeof addCategorySchema>;
