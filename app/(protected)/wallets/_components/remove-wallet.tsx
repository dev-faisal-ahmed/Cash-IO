import { Loader } from '@/components/shared/loader';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { serverAddress } from '@/data/server-address';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type RemoveWalletProps = {
  balance: number;
  _id: string;
  onDialogClose: () => void;
};

export function RemoveWallet({
  _id,
  balance,
  onDialogClose,
}: RemoveWalletProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onDeleteWallet() {
    if (balance > 0)
      return toast({
        title:
          'Can not delete the wallet, transfer you money to another wallet',
        variant: 'destructive',
        duration: 1000,
      });

    setLoading(true);
    const url = `${serverAddress}/api/delete-wallet?_id=${_id}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        toast({
          title: data.msg,
          variant: data.ok ? 'default' : 'destructive',
          duration: 1000,
        });
        if (data.ok) {
          router.refresh();
          onDialogClose();
        }
      })
      .catch(() => {
        toast({
          title: 'Something went wrong',
          variant: 'destructive',
          duration: 1000,
        });
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className='mt-3'>
      <h1 className='text-justify font-semibold'>
        Are you sure that you want to remove this wallet?
      </h1>
      <p className='text-xs text-muted-foreground'>
        Make sure to transfer all the balance to another wallet
      </p>
      <div className='items-centers ml-auto mt-8 flex w-fit gap-3'>
        {loading ? (
          <div className='h-fit cursor-not-allowed rounded-md border px-3 py-2'>
            <Loader />
          </div>
        ) : (
          <>
            <DialogClose asChild>
              <Button variant={'outline'} size={'sm'}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={onDeleteWallet}
              variant={'destructive'}
              size={'sm'}
            >
              Yes Delete
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
