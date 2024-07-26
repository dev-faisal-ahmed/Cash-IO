import mongoose from 'mongoose';
import { Transaction } from '../../transactions/transaction.model';
import { Source } from '../source.model';

export const getSource = async (sourceId: string) => {
  const source = await Source.findOne({ _id: sourceId });
  const [transactionDetails] = await Transaction.aggregate([
    { $match: { sourceId: new mongoose.Types.ObjectId(sourceId) } },
    {
      $lookup: {
        from: 'wallets',
        localField: 'walletId',
        foreignField: '_id',
        as: 'wallet',
      },
    },
    {
      $group: {
        _id: null,
        transactions: {
          $push: {
            _id: '$_id',
            wallet: '$wallet',
            amount: '$amount',
            date: '$date',
            type: '$type',
          },
        },
        income: {
          $sum: {
            $cond: [
              {
                $eq: ['$type', 'INCOME'],
              },
              '$amount',
              0,
            ],
          },
        },
        expense: {
          $sum: {
            $cond: [
              {
                $eq: ['$type', 'EXPENSE'],
              },
              '$amount',
              0,
            ],
          },
        },
      },
    },
  ]);

  return { source, transactionDetails };
};
