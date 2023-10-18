import { serverAddress } from '@/data/server-address';
import { WalletType } from '@/lib/types';
import { useState } from 'react';

export function useGetWallets(email: string) {
  const url = `${serverAddress}/api/get-wallets?email=${email}`;
  const [wallets, setWallets] = useState<WalletType[]>([]);

  function fetchWallets() {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) setWallets(data.data);
      });
  }

  return { wallets, fetchWallets };
}
