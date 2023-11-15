import { ReactNode } from 'react';

// ********* wallets ********* \\
export type WalletType = {
  _id: string;
  email: string;
  name: string;
  fixedDeposit?: boolean;
  icon: string;
  revenue: number;
  expense: number;
};

// ********* transfer ********* \\
export type TransferType = {
  _id: string;
  to: string;
  from: string;
  amount: number;
  date: string;
  icon: string;
};

// ********* categories ********* \\
export type RevenueCategoryType = {
  name: string;
  icon: string;
  type: 'revenue';
  amount: number;
};

export type ExpenseCategoryType = {
  name: string;
  icon: string;
  type: 'expense';
  amount: number;
};

export type CategoriesType = {
  revenue: RevenueCategoryType[];
  expense: ExpenseCategoryType[];
};

export type CategoriesSummaryType = {
  revenue: { totalAmount: number; categories: RevenueCategoryType[] };
  expense: { totalAmount: number; categories: ExpenseCategoryType[] };
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

export type MonthlyTransactionTypeForGraph = {
  date: string;
  revenue: number;
  expense: number;
};

export type IconDataType = {
  [key: string]: ReactNode;
};

export type CategoriesTypeProps = {
  revenue: Omit<RevenueCategoryType, 'amount'>[];
  expense: Omit<ExpenseCategoryType, 'amount'>[];
};

export type WalletOptionType = {
  name: string;
  icon: string;
};
