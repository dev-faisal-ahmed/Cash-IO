'use client';

import { useGetUser } from '@/hooks/use-get-user';
import { useGetWallets } from '@/hooks/use-get-wallets';
import { WalletContainer } from './wallet-container';
import { useEffect } from 'react';

export function AllWallets() {
  const { user } = useGetUser();
  const { wallets, fetchWallets } = useGetWallets(user?.email as string);

  useEffect(() => {
    fetchWallets();
  }, []);

  return (
    <>
      {wallets?.map((wallet, index) => (
        <WalletContainer
          key={index}
          _id={wallet._id}
          expense={wallet.expense}
          icon={wallet.icon}
          name={wallet.name}
          revenue={wallet.revenue}
        />
      ))}
    </>
  );
}
