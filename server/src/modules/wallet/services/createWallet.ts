import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../../utils/app.error';
import { TUser } from '../../user/user.interface';
import { Wallet } from '../wallet.model';
import { TCreateWalletPayload } from '../wallet.validation';

export const createWallet = async (
  user: TUser,
  payload: TCreateWalletPayload
) => {
  // check if the wallet exist or not
  const isWalletExist = await Wallet.findOne({
    userId: user._id,
    name: payload.name,
  });

  if (isWalletExist)
    throw new AppError('Wallet Already Exist', StatusCodes.BAD_REQUEST);

  const newWallet = await Wallet.create({
    ...payload,
    userId: user._id,
    income: payload.initialBalance || 0,
  });
  return newWallet;
};
