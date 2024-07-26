import { Schema, model } from 'mongoose';
import { TTransaction } from './transaction.interface';
import { transactionTypes } from './transaction.constants';

const TransactionSchema = new Schema<TTransaction>({
  userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  walletId: { type: Schema.Types.ObjectId, ref: 'wallet', required: true },
  sourceId: { type: Schema.Types.ObjectId, ref: 'source', required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  type: { type: String, enum: transactionTypes, required: true },
  fee: { type: Number, default: 0 },
});

export const Transaction = model('transaction', TransactionSchema);
