import mongoose from 'mongoose';
import { TUser } from '../../user/user.interface';
import { Wallet } from '../../wallet/wallet.model';
import { TCreateTransferPayload } from '../transfer.validation';
import { AppError } from '../../../utils/app.error';
import { StatusCodes } from 'http-status-codes';
import { Transfer } from '../transfer.model';
import { User } from '../../user/user.model';

export const createTransfer = async (
  user: TUser,
  payload: TCreateTransferPayload
) => {
  const userId = user._id;
  const { senderWalletId, receiverWalletId, amount, fee = 0 } = payload;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // checking if sender wallet exist or not
    const isSenderWalletExist = await Wallet.findOne({
      _id: senderWalletId,
      userId,
    });

    if (!isSenderWalletExist)
      throw new AppError('Sender Wallet not found', StatusCodes.NOT_FOUND);

    // checking balance is lower than the transfer amount
    const { income, expense } = isSenderWalletExist?.toObject();
    const balance = income - expense;
    if (balance - fee < amount)
      throw new AppError('Not Sufficient Balance', StatusCodes.BAD_REQUEST);

    // checking if receiver wallet exist or not
    const isReceiverWalletExist = await Wallet.findOne({
      _id: receiverWalletId,
      userId,
    });

    if (!isReceiverWalletExist)
      throw new AppError('Receiver Wallet not found', StatusCodes.NOT_FOUND);

    // creating a transfer
    const date = new Date(payload.date);
    const newTransfer = await Transfer.create([{ ...payload, userId, date }], {
      session,
    });

    if (!newTransfer)
      throw new AppError('Failed to transfer', StatusCodes.BAD_REQUEST);

    // updating sender wallet
    const updatedSenderWallet = await Wallet.updateOne(
      { _id: senderWalletId },
      { $inc: { expense: amount + fee } },
      { session }
    );

    if (!updatedSenderWallet)
      throw new AppError(
        'Failed to update sender wallet',
        StatusCodes.BAD_REQUEST
      );

    // updating receiver wallet
    const updatedReceiverWallet = await Wallet.updateOne(
      { _id: receiverWalletId },
      { $inc: { income: amount } },
      { session }
    );

    if (!updatedReceiverWallet)
      throw new AppError(
        'Failed to update sender wallet',
        StatusCodes.BAD_REQUEST
      );

    // update user balance if fee is not zero
    if (fee) {
      const updatedUser = await User.updateOne(
        { _id: userId },
        { $inc: { expense: fee } },
        { session }
      );

      if (!updatedUser)
        throw new AppError(
          'Can not update user balance',
          StatusCodes.BAD_REQUEST
        );
    }

    await session.commitTransaction();
    return newTransfer;
  } catch (err: any) {
    await session.abortTransaction();

    throw new AppError(
      err.message || 'something went wrong',
      err.status || 400
    );
  } finally {
    await session.endSession();
  }
};
