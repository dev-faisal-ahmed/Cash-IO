import { Schema } from 'mongoose';
import { TIcon } from '../../utils/global-types';

export type TWallet = {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  name: string;
  income: number;
  expense: number;
  saving: boolean;
  icon: TIcon;
};
