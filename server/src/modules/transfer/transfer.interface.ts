import { Schema } from 'mongoose';

export type TTransfer = {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  receiverWalletId: Schema.Types.ObjectId;
  senderWalletId: Schema.Types.ObjectId;
  amount: number;
  date: Date;
  fee: number;
};
