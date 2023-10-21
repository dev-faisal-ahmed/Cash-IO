import { type } from 'os';
import { ReactNode } from 'react';

// ********* wallets ********* \\
export type WalletType = {
  _id: string;
  email: string;
  name: string;
  fixedDeposit: boolean;
  icon: string;
  revenue: number;
  expense: number;
};

// ********* transfer ********* \\
export type TransferType = {
  _id: string;
  email: string;
  to: string;
  from: string;
  amount: number;
  date: string;
};
// ********* categories ********* \\
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
// ********* Transactions ********* \\

export type TransactionType = {
  _id: string;
  date: string;
  category: string;
  type: 'expense' | 'revenue';
  description: string;
  wallet: string;
  icon: string;
  amount: number;
};

export type TransactionsTypeSeverData = {
  revenue: TransactionType[];
  expense: TransactionType[];
};

export type MonthlyTransactionType = {
  [key: string]: TransactionType[];
};

// ********* server-response ********* \\
export type ServerResponseType = {
  ok: boolean;
  msg: string;
};

export type IconDataType = {
  [key: string]: ReactNode;
};

export type CategoriesTypeProps = {
  revenue: Omit<RevenueType, 'amount'>[];
  expense: Omit<ExpenseType, 'amount'>[];
};

export type WalletOptionType = {
  name: string;
  icon: string;
};
