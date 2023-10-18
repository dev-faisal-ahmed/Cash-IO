import { serverAddress } from '@/data/server-address';
import { AddWallet } from './_components/add-wallet';
import { WalletType } from '@/lib/types';
import { getServerSession } from 'next-auth';
import { WalletContainer } from './_components/wallet-container';

async function getWallets(email: string): Promise<WalletType[]> {
  const url = `${serverAddress}/api/get-wallets?email=${email}`;
  const response = await fetch(url, { cache: 'no-store' }).then((res) =>
    res.json(),
  );
  return response.ok ? response.data : [];
}

export default async function WalletPage() {
  const session = await getServerSession();
  const email = session?.user?.email;
  const wallets = await getWallets(email as string);

  return (
    <section className='grid grid-cols-3 gap-6'>
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
      <AddWallet />
    </section>
  );
}
