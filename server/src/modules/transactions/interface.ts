import { Schema } from 'mongoose';

export type TTransactionType = 'INCOME' | 'EXPENSE';

export type TTransaction = {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  walletId: Schema.Types.ObjectId;
  sourceId: Schema.Types.ObjectId;
  amount: number;
  date: Date;
  type: TTransactionType;
  fee?: number;
};
