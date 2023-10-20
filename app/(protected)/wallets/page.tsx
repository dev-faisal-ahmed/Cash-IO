import { AddWallet } from './_components/add-wallet';
import { WalletType } from '@/lib/types';
import { getServerSession } from 'next-auth';
import { WalletContainer } from './_components/wallet-container';
import { getWallets } from '@/helpers/api-request';

export default async function WalletPage() {
  const session = await getServerSession();
  const email = session?.user?.email;
  const wallets: WalletType[] = await getWallets(email as string);

  const allWallets: string[] = [];
  wallets.forEach((wallet) => {
    allWallets.push(wallet.name);
  });

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
          allWallets={allWallets}
        />
      ))}
      <AddWallet />
    </section>
  );
}
