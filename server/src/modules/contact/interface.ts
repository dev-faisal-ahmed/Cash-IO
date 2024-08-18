import { Schema } from 'mongoose';

export type TContact = {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  name: string;
  phone: string;
  isDeleted: boolean;
};
