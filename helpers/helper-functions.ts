import { TransactionType } from '@/lib/data-types';
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
  const rangedTransaction: { [key: string]: { date: string; amount: number } } =
    {};

  for (let i = 0; i < range; i++) {
    let amount = 0;
    const newDate = today.getTime() - i * 86400000; // I day =  86,400,000 ms
    const newDateStr = new Date(newDate).toString().slice(4, 15);
    if (dailyTransactions[newDateStr]) {
      Object.values(dailyTransactions[newDateStr]).forEach((transaction) => {
        amount += transaction.amount;
      });
    }
    rangedTransaction[newDateStr] = { date: newDateStr.slice(0, 6), amount };
  }
  return rangedTransaction;
}
