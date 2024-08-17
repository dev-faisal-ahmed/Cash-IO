import { sendSuccessResponse } from '../../../helpers';
import { asyncHandler } from '../../../middlewares';
import { AppError } from '../../../utils';
import { TUser } from '../../user/user.interface';
import { Category } from '../category.model';

export const deleteCategory = asyncHandler(async (req, res) => {
  const user: TUser = req.user;
  const { categoryId } = req.params;

  const isCategoryExist = await Category.findOneAndUpdate(
    { _id: categoryId, userId: user._id },
    { $set: { isDeleted: true } }
  );

  if (!isCategoryExist) throw new AppError('Category Not Found', 404);

  return sendSuccessResponse(res, {
    status: 200,
    message: 'category deleted successfully',
    data: null,
  });
});
