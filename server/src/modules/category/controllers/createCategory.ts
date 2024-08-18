import { sendSuccessResponse } from '../../../helpers';
import { asyncHandler } from '../../../middlewares';
import { AppError } from '../../../utils';
import { TUser } from '../../user/interface';
import { Category } from '../model';
import { createCategorySchema } from '../validation';

export const createCategory = asyncHandler(async (req, res) => {
  const payload = await createCategorySchema.parseAsync(req.body);
  const user: TUser = req.user;

  const isCategoryExist = await Category.findOne({
    name: payload.name,
    userId: user._id,
  });

  if (isCategoryExist) throw new AppError('Category Already Exist', 400);
  const newCategory = await Category.create({ ...payload, userId: user._id });
  if (!newCategory) throw new AppError('Failed to create category', 400);

  return sendSuccessResponse(res, {
    status: 200,
    message: 'Category Created Successfully',
    data: newCategory,
  });
});
