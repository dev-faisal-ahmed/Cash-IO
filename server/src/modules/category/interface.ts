import { Schema } from 'mongoose';

export type TCategoryType = 'INCOME' | 'EXPENSE' | 'BOTH';

export type TCategory = {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  name: string;
  icon: string;
  type: TCategoryType;
};
