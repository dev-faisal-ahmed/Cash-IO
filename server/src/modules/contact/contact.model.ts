import { Schema, model } from 'mongoose';
import { TContact } from './contact.interface';

const ContactSchema = new Schema<TContact>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  lend: { type: Number, default: 0 },
  borrow: { type: Number, default: 0 },
});

export const Contact = model('contact', ContactSchema);
