import { Schema, model } from 'mongoose';
import { TWallet } from './wallet.interface';

const WalletSchema = new Schema<TWallet>({
  name: { type: String, trim: true, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  income: { type: Number, default: 0 },
  expense: { type: Number, default: 0 },
  saving: { type: Boolean, default: false },
  icon: {
    type: {
      name: { type: String, required: true },
      group: { type: String, required: true },
    },
    required: true,
  },
});

export const Wallet = model('wallet', WalletSchema);
