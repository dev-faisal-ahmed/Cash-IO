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
