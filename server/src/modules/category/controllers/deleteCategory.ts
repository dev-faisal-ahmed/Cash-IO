import { sendSuccessResponse } from '../../../helpers';
import { catchAsync } from '../../../middlewares';
import { AppError } from '../../../utils';
import { TUser } from '../../user/interface';
import { Category } from '../model';

export const deleteCategory = catchAsync(async (req, res) => {
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
