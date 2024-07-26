import { TUser } from '../../user/user.interface';
import { Transfer } from '../transfer.model';

export const getTransfers = async (user: TUser) => {
  const transfers = await Transfer.find({ userId: user._id }).populate([
    'senderWalletId',
    'receiverWalletId',
  ]);

  return transfers;
};
