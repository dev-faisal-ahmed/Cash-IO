import { AppError, SendSuccessResponse, TryCatch } from '../../../utils';
import { TUser } from '../../user/interface';
import { Category } from '../model';

export const DeleteCategory = TryCatch(async (req, res) => {
  const user: TUser = req.user;
  const { categoryId } = req.params;

  const isCategoryExist = await Category.findOne({
    _id: categoryId,
    userId: user._id,
  });

  if (!isCategoryExist) throw new AppError('Category Not Found', 404);

  const response = await Category.updateOne(
    { _id: categoryId },
    { $set: { isDeleted: true } }
  );

  if (!response.acknowledged)
    throw new AppError('Failed to delete category', 400);

  SendSuccessResponse(res, {
    status: 200,
    message: 'category deleted successfully',
    data: null,
  });
});
