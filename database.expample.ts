type GoalsCollection = {
  _id: string;
  email: string;
  goal: number;
};

type BudgetsCollection = {
  _id: string;
  email: string;
  budget: number;
};

type CategoriesCollection = {
  _id: string;
  name: string;
  type: 'expense' | 'revenue';
  icon: string;
  email: string;
  amount: number;
};

type TransactionsCollection = {
  _id: string;
  amount: number;
  description: string;
  category: string;
  icon: string;
  email: string;
  date: string;
  type: 'expense' | 'revenue';
  wallet: string;
};

type TransfersCollection = {
  _id: string;
  email: string;
  from: string;
  to: string;
  amount: number;
  icon: string;
  date: string;
};

type WalletsCollections = {
  _id: string;
  email: string;
  name: string;
  saving: true;
  icon: string;
  revenue: number;
  expenses: number;
};
