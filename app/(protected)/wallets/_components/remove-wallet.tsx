import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';

export function RemoveWallet() {
  return (
    <div className='mt-3'>
      <h1 className='text-justify font-semibold'>
        Are you sure that you want to remove this wallet?
      </h1>
      <p className='text-xs text-muted-foreground'>
        Make sure to transfer all the balance to another wallet
      </p>
      <div className='items-centers ml-auto mt-8 flex w-fit gap-3'>
        <DialogClose asChild>
          <Button variant={'outline'} size={'sm'}>
            Cancel
          </Button>
        </DialogClose>
        <Button variant={'destructive'} size={'sm'}>
          Yes Delete
        </Button>
      </div>
    </div>
  );
}
