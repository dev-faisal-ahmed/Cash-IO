import { Schema, model } from 'mongoose';
import { TWallet } from './interface';

const walletSchema = new Schema<TWallet>(
  {
    name: { type: String, trim: true, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    saving: { type: Boolean, default: false },
    icon: { type: String, required: true },
  },
  { timestamps: true }
);

walletSchema.index({ name: 1, userId: 1 }, { unique: true });

export const Wallet = model<TWallet>('wallet', walletSchema);
