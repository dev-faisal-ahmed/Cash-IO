import { z } from 'zod';
import { enumGenerator } from '../../helpers';
import { categoryTypes } from './constants';

export const createCategorySchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  icon: z.string({ required_error: 'Icon is required' }),
  type: enumGenerator(
    categoryTypes,
    `CategoryType is required and it has to be ${categoryTypes}`
  ),
  budget: z.number().optional(),
});

export const updateCategorySchema = z.object({
  name: z.string().optional(),
  icon: z.string().optional(),
  type: enumGenerator(
    categoryTypes,
    `CategoryType has to be ${categoryTypes}`
  ).optional(),
  budget: z.number().optional(),
});
