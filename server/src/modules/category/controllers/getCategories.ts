import { sendSuccessResponse } from '../../../helpers';
import { asyncHandler } from '../../../middlewares';
import { Category } from '../model';

export const getCategories = asyncHandler(async (req, res) => {
  // query
  const user = req.user;
  const { query } = req;

  let getAll = query.getAll as string;
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 20;

  const dbQuery = { userId: user._id, isDeleted: false };

  const categoriesQuery = Category.find(dbQuery);
  categoriesQuery.sort({ createdAt: -1 });

  if (!getAll || getAll.toLowerCase() !== 'all')
    categoriesQuery.skip((page - 1) * limit).limit(limit);

  const categories = await categoriesQuery;

  const total = await Category.countDocuments(dbQuery);
  const totalPages = Math.ceil(total / limit);

  return sendSuccessResponse(res, {
    status: 200,
    message: 'Categories retrieved successfully',
    meta: { page, limit, total, totalPages },
    data: categories,
  });
});
