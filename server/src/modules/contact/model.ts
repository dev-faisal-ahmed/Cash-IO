import { Schema, model } from 'mongoose';
import { TContact } from './interface';

const ContactSchema = new Schema<TContact>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  isDeleted: { type: Boolean, default: false },
});

export const Contact = model<TContact>('contact', ContactSchema);
