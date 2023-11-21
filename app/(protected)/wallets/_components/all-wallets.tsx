'use client';

import { Loader } from '@/components/shared/loader';
import { useGetUser } from '@/hooks/use-get-user';
import { useGetWalletsQuery } from '@/redux/services/api';
import { WalletContainer } from './wallet-container';

export function AllWallets() {
  const { user } = useGetUser();
  const { data: wallets, isLoading } = useGetWalletsQuery(user?.email!);

  if (isLoading)
    return (
      <div className='flex h-full min-h-[200px] w-full items-center justify-center rounded-lg border'>
        <Loader />
      </div>
    );

  return (
    <>
      {wallets &&
        wallets.map((wallet, index) => (
          <WalletContainer
            key={index}
            _id={wallet._id}
            expense={wallet.expense}
            icon={wallet.icon}
            name={wallet.name}
            revenue={wallet.revenue}
            saving={wallet.saving}
          />
        ))}
    </>
  );
}
