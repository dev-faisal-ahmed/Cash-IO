import { Schema, model } from 'mongoose';
import { TCategory } from './interface';
import { categoryTypes } from './constants';

const categorySchema = new Schema<TCategory>(
  {
    name: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    icon: { type: String, required: true },
    type: { type: String, enum: categoryTypes, required: true },
    budget: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// preventing user to create category with same name
categorySchema.index({ userId: 1, name: 1 }, { unique: true });

export const Category = model<TCategory>('category', categorySchema);
