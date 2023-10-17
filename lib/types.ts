import { ReactNode } from 'react';

export type TransactionType = {
  _id: string;
  date: string;
  category: string;
  type: 'expense' | 'revenue';
  description: string;
  wallet: string;
  categoryIcon: string;
  amount: number;
};

export type MonthlyTransactionType = {
  [key: string]: TransactionType[];
};

export type TransferType = {
  to: string;
  from: string;
  amount: number;
  date: string;
};

export type WalletType = {
  _id: string;
  name: string;
  expense: number;
  revenue: number;
  icon: string;
};

export type IconDataType = {
  [key: string]: ReactNode;
};
