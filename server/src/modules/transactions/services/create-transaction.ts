import mongoose from 'mongoose';
import { TUser } from '../../user/user.interface';
import { Wallet } from '../../wallet/wallet.model';
import { AppError } from '../../../utils/app.error';
import { StatusCodes } from 'http-status-codes';
import { Source } from '../../source/source.model';
import { Transaction } from '../transaction.model';
import { User } from '../../user/user.model';
import { TCreateTransactionPayload } from '../transaction.validation';

export const createTransaction = async (
  user: TUser,
  payload: TCreateTransactionPayload
) => {
  const session = await mongoose.startSession();
  const { amount, sourceId, walletId, type, fee = 0 } = payload;
  const userId = user._id;

  try {
    session.startTransaction();
    // checking if source exist?
    const isSourceExist = await Source.findOne({ _id: sourceId, userId });
    if (!isSourceExist)
      throw new AppError('Source not found', StatusCodes.NOT_FOUND);

    // checking if wallet exist ?
    const isWalletExist = await Wallet.findOne({ _id: walletId, userId });
    if (!isWalletExist)
      throw new AppError('Wallet not found', StatusCodes.NOT_FOUND);

    isWalletExist.toObject();

    if (type === 'EXPENSE') {
      const balance = isWalletExist.income - isWalletExist.expense;
      if (balance < amount)
        throw new AppError('Insufficient Balance', StatusCodes.BAD_REQUEST);
    }

    const date = new Date(payload.date);

    // adding new transactions
    const [newTransaction] = await Transaction.create(
      [{ ...payload, userId, type, date }],
      { session }
    );

    if (!newTransaction)
      throw new AppError(
        'Transaction creation failed',
        StatusCodes.BAD_REQUEST
      );

    // update users balance
    const userUpdateQuery =
      type === 'INCOME'
        ? { $inc: { income: amount - fee } }
        : { $inc: { expense: amount + fee } };

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      userUpdateQuery,
      { session }
    );

    if (!updatedUser)
      throw new AppError(
        'Failed to update user balance',
        StatusCodes.BAD_REQUEST
      );

    // update wallet balance
    const updateWalletQuery =
      type === 'INCOME'
        ? { $inc: { income: amount - fee } }
        : { $inc: { expense: amount + fee } };

    const updateWallet = await Wallet.findOneAndUpdate(
      { _id: walletId, userId },
      updateWalletQuery,
      { session }
    );

    if (!updateWallet)
      throw new AppError(
        'Failed to update wallet balance',
        StatusCodes.BAD_REQUEST
      );

    await session.commitTransaction();
    return newTransaction;
  } catch (err: any) {
    await session.abortTransaction();

    throw new AppError(
      err.message || 'Something went wrong',
      err.status || 400
    );
  } finally {
    await session.endSession();
  }
};
