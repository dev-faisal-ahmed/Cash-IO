import { Source } from '../../source/source.model';
import { TUser } from '../../user/user.interface';
import { User } from '../../user/user.model';

export const getMetaData = async (user: TUser) => {
  const userInfo = await User.findOne({ _id: user._id });
  const sources = await Source.aggregate([
    {
      $match: {
        $and: [
          {
            userId: user._id,
            $or: [
              {
                type: 'EXPENSE',
              },
              {
                type: 'BOTH',
              },
            ],
          },
          { budget: { $gt: 0 } },
        ],
      },
    },
    {
      $lookup: {
        from: 'transactions',
        localField: '_id',
        foreignField: 'sourceId',
        as: 'transactions',
      },
    },
    {
      $unwind: '$transactions',
    },
    {
      $group: {
        _id: '$_id',
        info: {
          $first: {
            name: '$name',
            icon: '$icon',
            budget: '$budget',
          },
        },
        expense: {
          $sum: {
            $cond: [
              {
                $eq: ['$transactions.type', 'EXPENSE'],
              },
              '$transactions.amount',
              0,
            ],
          },
        },
      },
    },
  ]);

  return {
    userInfo,
    sources,
  };
};
