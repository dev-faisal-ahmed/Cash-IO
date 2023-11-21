import { TransactionType } from './data-types';

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

export type ServerBudgetResponseType = {
  ok: boolean;
  budget: number;
};

export type ServerThisMonthTransactionResponseType = {
  _id: string;
  amount: number;
};

export type ServerGoalResponseType = {
  ok: boolean;
  goal: number;
};
