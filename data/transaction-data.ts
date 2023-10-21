import { TransactionType } from '@/lib/data-types';

export const transactionsData: TransactionType[] = [
  {
    _id: '6529d3ba5ff163f209c6fca6',
    date: '10 OCT 2023',
    category: 'Food',
    type: 'expense',
    description: 'Ate Jhalmuri',
    wallet: 'Cash',
    categoryIcon: '🍊',
    amount: 30,
  },
  {
    _id: '6529d3ba5ff163f209c6fca6',
    date: '16 OCT 2023',
    category: 'Tuitions',
    type: 'revenue',
    description: 'Got Salary',
    wallet: 'Cash',
    categoryIcon: '🏫',
    amount: 6000,
  },
  {
    _id: '6529d3ba5ff163f209c6fca6',
    date: '17 OCT 2023',
    category: 'Food',
    type: 'expense',
    description:
      'Ate Burger lorem hi I am looing for a job can you give me one?',
    wallet: 'Cash',
    categoryIcon: '🍊',
    amount: 120,
  },
  {
    _id: '6529d3ba5ff163f209c6fca6',
    date: '5 OCT 2023',
    category: 'Axios-Byte',
    type: 'revenue',
    description: 'First Milestone',
    wallet: 'Cash',
    categoryIcon: '📙',
    amount: 100,
  },
];
