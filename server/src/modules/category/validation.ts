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
});

export const CategoryValidation = { SCreateCategory };

export type TCreateCategoryPayload = z.infer<typeof SCreateCategory>;
