import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import { providers } from './user.constants';

const UserSchema = new Schema<TUser>({
  name: { type: String, default: 'GUEST USER' },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  imageUrl: { type: String },
  provider: { type: String, enum: providers, default: 'CREDENTIALS' },
  budget: { type: Number, default: 0 },
});

export const User = model<TUser>('user', UserSchema);
