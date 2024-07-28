import { z } from 'zod';
import { EnumGenerator } from '../../helpers';
import { CategoryTypes } from './constants';

const SCreateCategory = z.object({
  name: z.string({ required_error: 'Name is required' }),
  icon: z.string({ required_error: 'Icon is required' }),
  type: EnumGenerator(
    CategoryTypes,
    `CategoryType is required and it has to be ${CategoryTypes}`
  ),
  budget: z.number().optional(),
});

const SUpdateCategory = z.object({
  name: z.string().optional(),
  icon: z.string().optional(),
  type: EnumGenerator(
    CategoryTypes,
    `CategoryType has to be ${CategoryTypes}`
  ).optional(),
  budget: z.number().optional(),
});

export const CategoryValidation = { SCreateCategory, SUpdateCategory };

export type TCreateCategoryPayload = z.infer<typeof SCreateCategory>;
export type TUpdateCategoryPayload = z.infer<typeof SUpdateCategory>;
