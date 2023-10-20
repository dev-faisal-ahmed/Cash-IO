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

export type RevenueType = {
  name: string;
  icon: string;
  type: 'revenue';
  amount: number;
};

export type ExpenseType = {
  name: string;
  icon: string;
  type: 'expense';
  amount: number;
};

export type CategoriesType = {
  revenue: RevenueType[];
  expense: ExpenseType[];
};

export type CategoriesTypeProps = {
  revenue: Omit<RevenueType, 'amount'>[];
  expense: Omit<ExpenseType, 'amount'>[];
};

export type WalletOptionType = {
  name: string;
  icon: string;
};
