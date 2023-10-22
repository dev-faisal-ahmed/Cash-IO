'use client';
import { FormEvent } from 'react';
import { IconPicker } from '@/components/shared/icon-picker';
import { Loader } from '@/components/shared/loader';
import { Button } from '@/components/ui/button';
import { useGetIcons } from '@/hooks/use-get-icons';
import { useEditWalletMutation } from '@/redux/services/api';
import { errorToast, generalToast } from '@/helpers/toast-helper';
import { FormInput } from '@/components/shared/form-input';

type EditWalletProps = {
  name: string;
  icon: string;
  _id: string;
  onDialogClose: () => void;
};

export function EditWallet({
  _id,
  name,
  icon,
  onDialogClose,
}: EditWalletProps) {
  const { allIconsData, selectedIcon, handleIconSelection } = useGetIcons();
  const [editWallet, { isLoading }] = useEditWalletMutation();

  function onEditWallet(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement & {
      walletName: { value: string };
    };

    const walletName = form.walletName.value.trim();
    if (walletName === name && icon === selectedIcon)
      return errorToast('Nothing to update');

    const fromData = {
      _id,
      name: walletName,
      icon: selectedIcon || icon,
    };

    editWallet(fromData)
      .unwrap()
      .then((response) => {
        generalToast(response.msg, response.ok);
        if (response.ok) onDialogClose();
      })
      .catch(() => errorToast());
  }

  return (
    <form onSubmit={onEditWallet}>
      <h1 className='mb-5 rounded-md border p-5 text-center text-9xl'>
        <span className='mx-auto block w-fit'>
          {selectedIcon ? allIconsData[selectedIcon] : allIconsData[icon]}
        </span>
      </h1>
      <FormInput
        title='Wallet Name'
        name='walletName'
        placeholder='Input Wallet Name'
        type='text'
        defaultValue={name}
        required
      />
      <div className='mt-5 flex items-center'>
        <IconPicker handleSelection={handleIconSelection} />
        {isLoading ? (
          <div className='ml-auto h-fit cursor-not-allowed rounded-md border px-3 py-2'>
            <Loader />
          </div>
        ) : (
          <Button className='ml-auto block h-fit px-3 py-2 font-semibold'>
            Edit Wallet
          </Button>
        )}
      </div>
    </form>
  );
}
