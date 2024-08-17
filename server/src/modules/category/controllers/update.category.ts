import { sendSuccessResponse } from '../../../helpers';
import { asyncHandler } from '../../../middlewares';
import { AppError } from '../../../utils';
import { TUser } from '../../user/user.interface';
import { Category } from '../category.model';
import { updateCategorySchema } from '../category.validation';

export const updateCategory = asyncHandler(async (req, res) => {
  const payload = await updateCategorySchema.parseAsync(req.body);
  const { categoryId } = req.params;
  const user: TUser = req.user;

  const isCategoryExist = await Category.findOneAndUpdate(
    { _id: categoryId, userId: user._id },
    { $set: payload }
  );

  if (!isCategoryExist) throw new AppError('Category not found', 404);

  return sendSuccessResponse(res, {
    status: 200,
    message: 'Category Updated Successfully',
    data: null,
  });
});
