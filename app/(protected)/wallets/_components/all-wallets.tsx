'use client';

import { Loader } from '@/components/shared/loader';
import { useGetUser } from '@/hooks/use-get-user';
import { useGetWalletsQuery } from '@/redux/services/api';
import { WalletContainer } from './wallet-container';

export function AllWallets() {
  const { user } = useGetUser();
  const {
    data: wallets,
    isLoading,
    isFetching,
  } = useGetWalletsQuery(user?.email!);

  if (isLoading || isFetching)
    return (
      <div className='flex h-full w-full items-center justify-center rounded-lg border'>
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
          />
        ))}
    </>
  );
}
