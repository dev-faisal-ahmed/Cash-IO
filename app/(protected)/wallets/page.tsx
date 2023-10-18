import { AddWallet } from './_components/add-wallet';
import { AllWallets } from './_components/all-wallets';

export default function WalletPage() {
  return (
    <section className='grid grid-cols-3 gap-8'>
      <AllWallets />
      <AddWallet />
    </section>
  );
}
