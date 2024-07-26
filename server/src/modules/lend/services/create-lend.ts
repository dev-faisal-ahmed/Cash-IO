import mongoose from 'mongoose';
import { TUser } from '../../user/user.interface';
import { Contact } from '../../contact/contact.model';
import { AppError } from '../../../utils/app.error';
import { StatusCodes } from 'http-status-codes';
import { Wallet } from '../../wallet/wallet.model';
import { Lend } from '../lend.model';
import { TCreateLendPayload } from '../lend.validation';
import { User } from '../../user/user.model';

export const createLend = async (user: TUser, payload: TCreateLendPayload) => {
  const { walletId, contactId, amount, type, fee = 0 } = payload;
  const userId = user._id;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    /* 
    check if contact exist or not
    check if wallet exist or not

    step 1 => creating lend
    step 2 => update user account
    step 3 => update wallet
  */

    // checking if contact exist or not
    const isContactExist = await Contact.findOne({ _id: contactId, userId });
    if (!isContactExist)
      throw new AppError('Contact not found', StatusCodes.NOT_FOUND);

    const isWalletExist = await Wallet.findOne({ _id: walletId, userId });
    if (!isWalletExist)
      throw new AppError('Wallet not found', StatusCodes.NOT_FOUND);

    // creating a lend
    const date = new Date(payload.date);
    const newLend = await Lend.create([{ ...payload, userId, date }], {
      session,
    });

    if (!newLend)
      throw new AppError('Failed to add new lend', StatusCodes.BAD_REQUEST);

    // updating user account
    const userUpdateQuery =
      type === 'LEND'
        ? { $inc: { expense: amount + fee } }
        : { $inc: { income: amount - fee } };

    const updatedUserInfo = await User.updateOne(
      { _id: userId },
      userUpdateQuery,
      { session }
    );

    if (!updatedUserInfo)
      throw new AppError(
        'Failed to update user balance',
        StatusCodes.BAD_REQUEST
      );

    // updating contact info
    const updateContactQuery =
      type === 'LEND'
        ? { $inc: { lend: amount } }
        : { $inc: { borrow: amount } };

    const updatedContact = await Contact.updateOne(
      { _id: contactId },
      updateContactQuery,
      { session }
    );

    if (!updatedContact)
      throw new AppError(
        'Failed to update contact info',
        StatusCodes.BAD_REQUEST
      );

    const updateWalletQuery =
      type === 'LEND'
        ? { $inc: { income: amount - fee } }
        : { $inc: { expense: amount + fee } };

    // updating wallet
    const updatedWallet = await Wallet.updateOne(
      { _id: walletId, userId },
      updateWalletQuery,
      { session }
    );

    if (!updatedWallet)
      throw new AppError(
        'Failed to update Wallet info',
        StatusCodes.BAD_REQUEST
      );

    await session.commitTransaction();
    return newLend;
  } catch (err: any) {
    await session.abortTransaction();

    throw new AppError(
      err.message || 'Something went wrong',
      err.status || 500
    );
  } finally {
    await session.endSession();
  }
};
