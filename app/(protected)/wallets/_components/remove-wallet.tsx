import { Loader } from '@/components/shared/loader';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { errorToast, generalToast } from '@/helpers/toast-helper';
import { useDeleteWalletMutation } from '@/redux/services/api';

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
  const [deleteWallet, { isLoading }] = useDeleteWalletMutation();

  async function onDeleteWallet() {
    if (balance > 0)
      return errorToast(
        'Can not delete the wallet, transfer you money to another wallet',
      );

    deleteWallet(_id)
      .unwrap()
      .then((response) => {
        generalToast(response.msg, response.ok);
        if (response.ok) onDialogClose();
      })
      .catch(() => errorToast());
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
        {isLoading ? (
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
