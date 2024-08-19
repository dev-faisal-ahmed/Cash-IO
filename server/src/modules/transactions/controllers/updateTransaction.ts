import { sendSuccessResponse } from '../../../helpers';
import { catchAsync } from '../../../middlewares';
import { AppError } from '../../../utils';
import { Transaction } from '../model';
import { updateTransactionSchema } from '../validation';

export const updateTransaction = catchAsync(async (req, res) => {
  // validation
  const payload = await updateTransactionSchema.parseAsync(req.body);
  const { transactionId } = req.params;
  const { _id } = req.user;

  const updatedStatus = await Transaction.updateOne(
    { _id: transactionId, userId: _id },
    { $set: payload }
  );

  if (!updatedStatus.acknowledged)
    throw new AppError('Failed to update transaction', 400);

  return sendSuccessResponse(res, {
    status: 200,
    message: 'Transaction updated successfully',
    data: null,
  });
});
