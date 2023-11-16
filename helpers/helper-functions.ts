import {
  ExpenseCategoryType,
  MonthlyTransactionTypeForGraph,
  RevenueCategoryType,
  TransactionType,
} from '@/lib/data-types';
import { WalletForTransactionType } from '@/lib/server-types';

export function getSummaryData(
  walletName: 'all' | string,
  wallets: WalletForTransactionType | undefined,
) {
  let revenue = 0;
  let expense = 0;
  let balance = 0;

  if (walletName === 'all') {
    if (wallets) {
      Object.values(wallets).forEach((wallet) => {
        revenue += wallet.revenue;
        expense += wallet.expense;
      });
      balance = (revenue | 0) - (expense | 0);
    }
    return { revenue, expense, balance };
  } else {
    if (wallets) {
      revenue = wallets[walletName].revenue;
      expense = wallets[walletName].expense;
      balance = (revenue | 0) - (expense | 0);
    }
  }

  return { revenue, expense, balance };
}

export function getDailyTransactions(transactions: TransactionType[]) {
  const length = transactions.length;
  const dailyTransaction: { [key: string]: TransactionType[] } = {};

  for (let i = 0; i < length; i++) {
    const date = new Date(transactions[i].date);
    const dateStrWithYear = date.toString().slice(4, 15);
    if (!dailyTransaction[dateStrWithYear]) {
      dailyTransaction[dateStrWithYear] = [];
    }
    dailyTransaction[dateStrWithYear].push(transactions[i]);
  }
  return dailyTransaction;
}

export function getDailyTransactionOnRanged(
  transactions: TransactionType[],
  range: number,
) {
  const today = new Date();
  const dailyTransactions = getDailyTransactions(transactions);
  const rangedTransaction: {
    [key: string]: { date: string; revenue: number; expense: number };
  } = {};

  for (let i = 0; i < range; i++) {
    let revenue = 0;
    let expense = 0;
    const newDate = today.getTime() - i * 86400000; // I day =  86,400,000 ms
    const newDateStr = new Date(newDate).toString().slice(4, 15);
    if (dailyTransactions[newDateStr]) {
      Object.values(dailyTransactions[newDateStr]).forEach((transaction) => {
        if (transaction.type === 'expense') expense += transaction.amount;
        else revenue += transaction.amount;
      });
    }
    rangedTransaction[newDateStr] = {
      date: newDateStr.slice(0, 6),
      revenue,
      expense,
    };
  }
  return rangedTransaction;
}

export function getMonthlyTransactions(transactions: TransactionType[]) {
  const monthlyTransactions: MonthlyTransactionTypeForGraph[] = [];
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  let start = month < 6 ? 1 : 6;
  let end = month < 6 ? 5 : 12;

  for (let i = start; i < end; i++) {
    let revenue = 0;
    let expense = 0;
    const dateStrArr = new Date(`${i}-1-${year}`).toString().split(' ');
    const dateStr = `${dateStrArr[1]}-${dateStrArr[3]}`;

    transactions.forEach((transaction) => {
      const transactionDateArr = new Date(transaction.date)
        .toString()
        .split(' ');
      const transactionDateStr = `${transactionDateArr[1]}-${transactionDateArr[3]}`;
      if (transactionDateStr === dateStr) {
        if (transaction.type === 'revenue') revenue += transaction.amount;
        else expense += transaction.amount;
      }
    });

    monthlyTransactions.push({
      date: dateStr,
      revenue,
      expense,
    });
  }
  return monthlyTransactions;
}

export function getDataForPieChart(
  categories: RevenueCategoryType[] | ExpenseCategoryType[] | undefined,
) {
  if (!categories) return [];
  const data: { name: string; amount: number }[] = [];
  const length = categories.length;
  for (let i = 0; i < length; i++) {
    if (categories[i].amount !== 0)
      data.push({ name: categories[i].name, amount: categories[i].amount });
  }
  return data;
}
