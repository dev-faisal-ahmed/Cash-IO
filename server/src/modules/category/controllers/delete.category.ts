import { AppError, SendSuccessResponse, TryCatch } from '../../../utils';
import { TUser } from '../../user/interface';
import { Category } from '../model';

export const DeleteCategory = TryCatch(async (req, res) => {
  const user: TUser = req.user;
  const { categoryId } = req.params;

  const isCategoryExist = await Category.findOneAndUpdate(
    { _id: categoryId, userId: user._id },
    { $set: { isDeleted: true } }
  );

  if (!isCategoryExist) throw new AppError('Category Not Found', 404);

  SendSuccessResponse(res, {
    status: 200,
    message: 'category deleted successfully',
    data: null,
  });
});
