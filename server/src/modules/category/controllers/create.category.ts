import { AppError, SendSuccessResponse, TryCatch } from '../../../utils';
import { TUser } from '../../user/interface';
import { Category } from '../model';
import { TCreateCategoryPayload } from '../validation';

export const CreateCategory = TryCatch(async (req, res) => {
  const payload: TCreateCategoryPayload = req.body;
  const user: TUser = req.user;

  const isCategoryExist = await Category.findOne({
    name: payload.name,
    userId: user._id,
  });

  if (isCategoryExist) throw new AppError('Category Already Exist', 400);
  const newCategory = await Category.create({ ...payload, userId: user._id });
  if (!newCategory) throw new AppError('Failed to create category', 400);

  SendSuccessResponse(res, {
    status: 200,
    message: 'Category Created Successfully',
    data: newCategory,
  });
});
