import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MenuIcon } from 'lucide-react';
import { EditWallet } from './edit-wallet';
import { TransactionTable } from '@/components/shared/transaction-table';
import { TransferBalance } from './transfer-balance';
import { RemoveWallet } from './remove-wallet';

type WalletContainerMenuProps = {
  _id: string;
  name: string;
  icon: string;
};

export function WalletContainerMenu({ name, icon }: WalletContainerMenuProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <MenuIcon className='cursor-pointer' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Wallet Options</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue='edit' className='mt-3 w-full'>
          <TabsList className='grid w-full grid-cols-3'>
            <TabsTrigger value='edit'>Edit</TabsTrigger>
            <TabsTrigger value='transfer'>Transfer</TabsTrigger>
            <TabsTrigger value='remove'>Remove</TabsTrigger>
          </TabsList>
          <div className='h-5' />
          <TabsContent value='edit'>
            <EditWallet name={name} icon={icon} />
          </TabsContent>
          <TabsContent value='transfer'>
            <TransferBalance />
          </TabsContent>
          <TabsContent value='remove'>
            <RemoveWallet />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
