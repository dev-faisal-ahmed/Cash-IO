import { AddWallet } from './_components/add-wallet';
import { AllWallets } from './_components/all-wallets';

export default async function WalletPage() {
  return (
    <section className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      <AllWallets />
      <AddWallet />
    </section>
  );
}
