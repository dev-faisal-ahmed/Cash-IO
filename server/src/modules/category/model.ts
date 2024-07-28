import { Schema, model } from 'mongoose';
import { TCategory } from './interface';
import { CategoryTypes } from './constants';

const SourceSchema = new Schema<TCategory>({
  name: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  icon: { type: String, required: true },
  type: { type: String, enum: CategoryTypes, required: true },
  budget: { type: String },
});

export const Category = model<TCategory>('category', SourceSchema);
