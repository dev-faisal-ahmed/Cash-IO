import { ExpenseType, RevenueType, TransactionType } from './data-types';

export type WalletForTransactionType = {
  [key: string]: {
    name: string;
    icon: string;
    revenue: number;
    expense: number;
  };
};

export type MonthlyTransactionType = {
  [key: string]: TransactionType[];
};

export type ServerResponseType = {
  ok: boolean;
  msg: string;
};
