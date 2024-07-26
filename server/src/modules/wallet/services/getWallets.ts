import { TUser } from '../../user/user.interface';
import { Wallet } from '../wallet.model';

export const getWallets = async (user: TUser) => {
  const wallets = await Wallet.find({ userId: user._id });
  return wallets;
};
