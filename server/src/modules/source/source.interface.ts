import { Schema } from 'mongoose';
import { TIcon } from '../../utils/global-types';

export type TSourceType = 'INCOME' | 'EXPENSE' | 'BOTH';

export type TSource = {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  name: string;
  amount: number;
  budget: number;
  type: TSourceType;
  icon: TIcon;
};
