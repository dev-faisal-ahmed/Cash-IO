import { Schema } from 'mongoose';

export type TUser = {
  _id: Schema.Types.ObjectId;
  email: string;
  name: string;
  budget?: number;
};
