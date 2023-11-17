'use client';
import * as Dialog from '@/components/ui/dialog';
import * as Tabs from '@/components/ui/tabs';
import { PlusIcon } from 'lucide-react';
import { AddCategory } from './add-category';
import { useState } from 'react';
import { AddTransaction } from './add-transaction';

export type TabsOptionsType = 'transaction' | 'category';

export function Adder() {
  const [open, setOpen] = useState(false);
  const [tabOption, setTabOption] = useState<TabsOptionsType>('transaction');

  function onTabChange(tabName: TabsOptionsType) {
    setTabOption(tabName);
  }

  function onDialogClose() {
    setOpen(false);
  }

  return (
    <Dialog.Dialog open={open} onOpenChange={setOpen}>
      <Dialog.DialogTrigger>
        <span className='flex h-8 w-8 items-center justify-center rounded-md border bg-transparent p-2 sm:h-10 sm:w-10'>
          <PlusIcon />
        </span>
      </Dialog.DialogTrigger>
      <Dialog.DialogContent>
        <Dialog.DialogHeader>
          <Dialog.DialogTitle>Adding Options</Dialog.DialogTitle>
        </Dialog.DialogHeader>
        <div className='max-h-[600px] overflow-y-auto p-1'>
          <Tabs.Tabs
            value={tabOption}
            defaultValue='transaction'
            className='mt-3 w-full'
          >
            <Tabs.TabsList className='grid w-full grid-cols-2'>
              <Tabs.TabsTrigger
                onClick={() => setTabOption('transaction')}
                value='transaction'
              >
                Add Transaction
              </Tabs.TabsTrigger>
              <Tabs.TabsTrigger
                onClick={() => setTabOption('category')}
                value='category'
              >
                Add Category
              </Tabs.TabsTrigger>
            </Tabs.TabsList>
            <div className='h-5' />
            <Tabs.TabsContent value='transaction'>
              <AddTransaction
                onTabChange={onTabChange}
                onDialogClose={onDialogClose}
              />
            </Tabs.TabsContent>
            <Tabs.TabsContent value='category'>
              <AddCategory onDialogClose={onDialogClose} />
            </Tabs.TabsContent>
          </Tabs.Tabs>
        </div>
      </Dialog.DialogContent>
    </Dialog.Dialog>
  );
}
