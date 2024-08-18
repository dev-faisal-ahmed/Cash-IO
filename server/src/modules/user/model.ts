import { Schema, model } from 'mongoose';
import { TUser } from './interface';
import { providers } from './constants';

const userSchema = new Schema<TUser>(
  {
    name: { type: String, default: 'GUEST USER' },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    imageUrl: { type: String },
    provider: { type: String, enum: providers, default: 'CREDENTIALS' },
    budget: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const User = model<TUser>('user', userSchema);
