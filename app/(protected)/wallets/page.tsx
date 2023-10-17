import { WalletContainer } from './_components/wallet-container';

export default function WalletPage() {
  return (
    <div className='grid grid-cols-3 gap-5'>
      <WalletContainer
        _id='i'
        expense={500}
        name='Rocket'
        revenue={1520}
        icon='🚀'
      />
    </div>
  );
}
