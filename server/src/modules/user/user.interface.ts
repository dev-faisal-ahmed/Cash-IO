import { Schema } from 'mongoose';

export type TUser = {
  _id: Schema.Types.ObjectId;
  email: string;
  name: string;
  phone: string;
  expense: number;
  income: number;
  borrow: number;
  lend: number;
  currency: string;
};
