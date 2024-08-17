import { Schema, model } from 'mongoose';
import { TCategory } from './category.interface';
import { categoryTypes } from './category.constants';

const sourceSchema = new Schema<TCategory>({
  name: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  icon: { type: String, required: true },
  type: { type: String, enum: categoryTypes, required: true },
  budget: { type: String },
  isDeleted: { type: Boolean, default: false },
});

export const Category = model<TCategory>('category', sourceSchema);
