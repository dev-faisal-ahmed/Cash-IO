export type TransactionType = {
  _id: string;
  date: Date | string;
  category: string;
  type: 'expense' | 'revenue';
  description: string;
  wallet: string;
  categoryIcon: string;
  amount: number;
};
