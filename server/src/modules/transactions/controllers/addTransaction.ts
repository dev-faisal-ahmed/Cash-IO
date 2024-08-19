import { sendSuccessResponse } from '../../../helpers';
import { catchAsync } from '../../../middlewares';
import { AppError } from '../../../utils';
import { Transaction } from '../model';
import { addTransactionSchema } from '../validation';

export const addTransaction = catchAsync(async (req, res) => {
  // validation
  const payload = await addTransactionSchema.parseAsync(req.body);
  const user = req.user;

  const transaction = await Transaction.create({
    ...payload,
    userId: user._id,
  });

  if (!transaction) throw new AppError('Failed to add transaction', 400);

  // sending response
  return sendSuccessResponse(res, {
    status: 200,
    message: 'Transaction added successfully',
    data: transaction,
  });
});
