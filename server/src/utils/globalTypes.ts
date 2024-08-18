import { Schema } from 'mongoose';

export type TAuthInfo = {
  _id: Schema.Types.ObjectId | string;
  name: string;
  email: string;
  imageUrl?: string;
};
