import { Schema } from 'mongoose';

export type TWallet = {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  name: string;
  saving: boolean;
  icon: string;
};
