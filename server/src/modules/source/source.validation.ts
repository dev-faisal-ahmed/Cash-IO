import { z } from 'zod';
import { sourceTypes } from './source.constants';

const CreateSources = z.object({
  name: z.string({ required_error: 'Name is required' }),
  type: z.enum([...(sourceTypes as [string, ...string[]])], {
    required_error: 'Source type is required',
  }),
  budget: z.number({}).optional(),
  icon: z.object(
    {
      group: z.string({ required_error: 'Icon Group is required' }),
      name: z.string({ required_error: 'Icon Name is required' }),
    },
    { required_error: 'Icon is required' }
  ),
});

const EditSource = z.object({
  name: z.string({ required_error: 'Name is required' }).optional(),
  budget: z.number({}).optional(),
  icon: z
    .object({
      group: z.string({ required_error: 'Icon Group is required' }),
      name: z.string({ required_error: 'Icon Name is required' }),
    })
    .optional(),
});

export const sourceValidation = { CreateSources, EditSource };

export type TCreateSourcePayload = z.infer<typeof CreateSources>;
export type TEditSourcePayload = z.infer<typeof EditSource>;
