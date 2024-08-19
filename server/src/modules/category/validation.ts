import { z } from 'zod';
import { enumGenerator } from '../../helpers';
import { categoryTypes } from './constants';

export const createCategorySchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(2, { message: 'Minimum length of categoryName is 2' }),
  icon: z
    .string({ required_error: 'Icon is required' })
    .min(2, { message: 'Invalid icon' }),
  type: enumGenerator(
    categoryTypes,
    `CategoryType is required and it has to be ${categoryTypes}`
  ),
  budget: z
    .number()
    .min(0, { message: 'Budget can not be negative' })
    .optional(),
});

export const updateCategorySchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Minimum length of categoryName is 2' })
    .optional(),
  icon: z.string().min(2, { message: 'Invalid icon' }).optional(),
  type: enumGenerator(
    categoryTypes,
    `CategoryType has to be ${categoryTypes}`
  ).optional(),
  budget: z
    .number()
    .min(0, { message: 'Budget can not be negative' })
    .optional(),
});
