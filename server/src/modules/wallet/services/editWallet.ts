import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../../utils/app.error';
import { Wallet } from '../wallet.model';
import { TEditWalletPayload } from '../wallet.validation';

export const editWallet = async (
  walletId: string,
  payload: TEditWalletPayload
) => {
  // checking if wallet exist or not
  const doesWalletExist = await Wallet.findOne({ _id: walletId });
  if (!doesWalletExist)
    throw new AppError('Wallet Not Found', StatusCodes.BAD_REQUEST);

  const updatedWallet = await Wallet.updateOne(
    { _id: walletId },
    { $set: { ...payload } }
  );

  return updatedWallet;
};
