import { Schema, model } from 'mongoose';
import { TLend } from './lend.interface';
import { lendTypes } from './lend.constants';

const LendSchema = new Schema<TLend>({
  userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  contactId: { type: Schema.Types.ObjectId, ref: 'contact', required: true },
  walletId: { type: Schema.Types.ObjectId, ref: 'wallet', required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  type: { type: String, enum: lendTypes, required: true },
  fee: { type: Number, default: 0 },
});

export const Lend = model('lend', LendSchema);
