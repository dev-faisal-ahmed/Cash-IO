import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function TransferBalance() {
  return (
    <form>
      <div className='mb-5 flex items-center gap-5'>
        <div className='w-full space-y-3'>
          <label htmlFor='fromWallet'>Sender Wallet</label>
          <Input
            id='fromWallet'
            className='w-full'
            type='text'
            placeholder='Input Wallet Name'
            disabled
          />
        </div>
        <div className='w-full space-y-3'>
          <label htmlFor='toWallet'>Receiver Wallet</label>
          <Input
            id='toWallet'
            name='toWallet'
            className='w-full'
            type='text'
            placeholder='Input Wallet Name'
          />
        </div>
      </div>
      <label htmlFor='amount'>Amount</label>
      <Input
        id='toWallet'
        name='toWallet'
        className='mt-3'
        type='number'
        placeholder='Input Wallet Name'
      />
      <Button className='ml-auto mt-5 block'>Proceed To Transfer</Button>
    </form>
  );
}
