import { Schema } from 'mongoose';

export type TLendType = 'LEND' | 'BORROW';

export type TLend = {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  contactId: Schema.Types.ObjectId;
  walletId: Schema.Types.ObjectId;
  amount: number;
  date: Date;
  type: TLendType;
  fee: number;
};
