'use client';
import * as Dialog from '@/components/ui/dialog';
import * as Tabs from '@/components/ui/tabs';
import { PlusIcon } from 'lucide-react';
import { AddCategory } from './add-category';
import { useState } from 'react';
import { CategoriesTypeProps, WalletOptionType } from '@/lib/types';
import { AddTransaction } from './add-transaction';

type AdderProps = {
  categories: CategoriesTypeProps;
  wallets: WalletOptionType[];
};

export function Adder({ categories, wallets }: AdderProps) {
  const [open, setOpen] = useState(false);

  function onDialogClose() {
    setOpen(false);
  }

  return (
    <Dialog.Dialog open={open} onOpenChange={setOpen}>
      <Dialog.DialogTrigger>
        <span className='flex h-10 w-10 items-center justify-center rounded-md border bg-transparent'>
          <PlusIcon />
        </span>
      </Dialog.DialogTrigger>
      <Dialog.DialogContent>
        <Dialog.DialogHeader>
          <Dialog.DialogTitle>Adding Options</Dialog.DialogTitle>
        </Dialog.DialogHeader>
        <Tabs.Tabs defaultValue='transaction' className='mt-3 w-full'>
          <Tabs.TabsList className='grid w-full grid-cols-2'>
            <Tabs.TabsTrigger value='transaction'>
              Add Transaction
            </Tabs.TabsTrigger>
            <Tabs.TabsTrigger value='category'>Add Category</Tabs.TabsTrigger>
          </Tabs.TabsList>
          <div className='h-5' />
          <Tabs.TabsContent value='transaction'>
            <AddTransaction wallets={wallets} categories={categories} />
          </Tabs.TabsContent>
          <Tabs.TabsContent value='category'>
            <AddCategory onDialogClose={onDialogClose} />
          </Tabs.TabsContent>
        </Tabs.Tabs>
      </Dialog.DialogContent>
    </Dialog.Dialog>
  );
}
