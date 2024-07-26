import { Schema, model } from 'mongoose';
import { TTransfer } from './transfer.interface';

const TransferSchema = new Schema<TTransfer>({
  userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },

  senderWalletId: {
    type: Schema.Types.ObjectId,
    ref: 'wallet',
    required: true,
  },

  receiverWalletId: {
    type: Schema.Types.ObjectId,
    ref: 'wallet',
    required: true,
  },

  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  fee: { type: Number, default: 0 },
});

export const Transfer = model('transfer', TransferSchema);
