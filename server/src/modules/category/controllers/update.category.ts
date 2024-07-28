import { AppError, SendSuccessResponse, TryCatch } from '../../../utils';
import { TUser } from '../../user/interface';
import { Category } from '../model';
import { TUpdateCategoryPayload } from '../validation';

export const UpdateCategory = TryCatch(async (req, res) => {
  const payload: TUpdateCategoryPayload = req.body;
  const { categoryId } = req.params;
  const user: TUser = req.user;

  const isCategoryExist = await Category.findOne({
    _id: categoryId,
    userId: user._id,
  });

  if (!isCategoryExist) throw new AppError('Category not found', 404);

  const response = await Category.updateOne(
    { _id: categoryId },
    { $set: payload }
  );

  if (!response.acknowledged)
    throw new AppError('Failed to update category', 400);

  SendSuccessResponse(res, {
    status: 200,
    message: 'Category Updated Successfully',
    data: null,
  });
});
