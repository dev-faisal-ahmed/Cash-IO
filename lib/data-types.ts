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
// ********* server-response ********* \\

// ********* server-response ********* \\
export type ServerResponseType = {
  ok: boolean;
  msg: string;
};
