import { Transaction } from '../../transactions/transaction.model';
import { Wallet } from '../wallet.model';

export const getWallet = async (walletId: string) => {
  const wallet = await Wallet.findOne({ _id: walletId });
  const transactions = await Transaction.find({ walletId }).populate(
    'sourceId'
  );

  return { wallet, transactions };
};
