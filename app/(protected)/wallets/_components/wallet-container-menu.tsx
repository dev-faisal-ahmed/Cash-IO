import * as Dialog from '@/components/ui/dialog';
import * as Tabs from '@/components/ui/tabs';
import { MenuIcon } from 'lucide-react';
import { EditWallet } from './edit-wallet';
import { TransferBalance } from './transfer-balance';
import { RemoveWallet } from './remove-wallet';
import { useState } from 'react';

type WalletContainerMenuProps = {
  _id: string;
  name: string;
  icon: string;
  balance: number;
};

export function WalletContainerMenu({
  _id,
  name,
  icon,
  balance,
}: WalletContainerMenuProps) {
  const [open, setOpen] = useState(false);

  function onDialogClose() {
    setOpen(false);
  }

  return (
    <Dialog.Dialog open={open} onOpenChange={setOpen}>
      <Dialog.DialogTrigger>
        <MenuIcon className='cursor-pointer' />
      </Dialog.DialogTrigger>
      <Dialog.DialogContent>
        <Dialog.DialogHeader>
          <Dialog.DialogTitle>Wallet Options</Dialog.DialogTitle>
        </Dialog.DialogHeader>
        <Tabs.Tabs defaultValue='edit' className='mt-3 w-full'>
          <Tabs.TabsList className='grid w-full grid-cols-3'>
            <Tabs.TabsTrigger value='edit'>Edit</Tabs.TabsTrigger>
            <Tabs.TabsTrigger value='transfer'>Transfer</Tabs.TabsTrigger>
            <Tabs.TabsTrigger value='remove'>Remove</Tabs.TabsTrigger>
          </Tabs.TabsList>
          <div className='h-5' />
          <Tabs.TabsContent value='edit'>
            <EditWallet
              _id={_id}
              name={name}
              icon={icon}
              onDialogClose={onDialogClose}
            />
          </Tabs.TabsContent>
          <Tabs.TabsContent value='transfer'>
            <TransferBalance
              balance={balance}
              fromWallet={name}
              // allWallets={allWallets}
              onDialogClose={onDialogClose}
            />
          </Tabs.TabsContent>
          <Tabs.TabsContent value='remove'>
            <RemoveWallet
              _id={_id}
              balance={balance}
              onDialogClose={onDialogClose}
            />
          </Tabs.TabsContent>
        </Tabs.Tabs>
      </Dialog.DialogContent>
    </Dialog.Dialog>
  );
}
