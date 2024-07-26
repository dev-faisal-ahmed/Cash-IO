import { Schema, model } from 'mongoose';
import { TUser } from './interface';

const UserSchema = new Schema<TUser>({
  name: { type: String, default: 'GUEST USER' },
  email: { type: String, required: true, unique: true },
  budget: { type: Number },
});

export const User = model('user', UserSchema);
