import { Schema } from 'mongoose';

export type TProvider = 'CREDENTIALS' | 'GOOGLE';
export type TUser = {
  _id: Schema.Types.ObjectId;
  email: string;
  password?: string;
  name: string;
  budget?: number;
  provider: TProvider;
};
