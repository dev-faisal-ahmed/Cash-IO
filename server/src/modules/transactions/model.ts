import { Schema, model } from 'mongoose';
import { TTransaction } from './interface';
import { transactionTypes } from './constants';

const transactionSchema = new Schema<TTransaction>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    walletId: { type: Schema.Types.ObjectId, ref: 'wallet', required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'source', required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: new Date() },
    type: { type: String, enum: transactionTypes, required: true },
    fee: { type: Number },
  },
  { timestamps: true }
);

export const Transaction = model<TTransaction>(
  'transaction',
  transactionSchema
);
