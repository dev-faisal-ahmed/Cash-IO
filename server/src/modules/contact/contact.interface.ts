import { Schema } from 'mongoose';

export type TContact = {
  _id: Schema.Types.ObjectId;
  name: string;
  phone: string;
  userId: Schema.Types.ObjectId;
  borrow: number;
  lend: number;
};
