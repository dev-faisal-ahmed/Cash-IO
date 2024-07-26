import { TUser } from '../../user/user.interface';
import { Transaction } from '../transaction.model';

export const getTransactions = async (user: TUser) => {
  const transactions = await Transaction.find({ userId: user._id }).populate([
    'sourceId',
    'walletId',
  ]);
  return transactions;
};
