import { AddWallet } from './_components/add-wallet';
import { EditWallet } from './_components/edit-wallet';
import { WalletContainer } from './_components/wallet-container';

export default function WalletPage() {
  return (
    <section className='grid grid-cols-3 gap-5'>
      <WalletContainer
        _id='i'
        expense={500}
        name='Rocket'
        revenue={1520}
        icon='🚀'
      />
      <AddWallet />
    </section>
  );
}
