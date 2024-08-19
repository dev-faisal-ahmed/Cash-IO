import { sendSuccessResponse } from '../../../helpers';
import { catchAsync } from '../../../middlewares';
import { AppError } from '../../../utils';
import { TUser } from '../../user/interface';
import { Category } from '../model';
import { updateCategorySchema } from '../validation';

export const updateCategory = catchAsync(async (req, res) => {
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
