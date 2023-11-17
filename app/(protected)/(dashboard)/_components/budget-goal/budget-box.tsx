'use client';
import * as Dialog from '@/components/ui/dialog';
import { Loader } from '@/components/shared/loader';
import { useGetUser } from '@/hooks/use-get-user';
import { GiSevenPointedStar } from 'react-icons/gi';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { AddEditBudget } from './add-edit-budget';
import {
  useGetBudgetQuery,
  useGetThisMonthTransactionQuery,
} from '@/redux/services/api';

export function BudgetBox() {
  const { user } = useGetUser();
  const [budgetDialog, setBudgetDialog] = useState(false);
  const { data: budgetData, isLoading: budgetLoading } = useGetBudgetQuery(
    user?.email!,
  );
  const { data: spentData, isLoading: spendLoading } =
    useGetThisMonthTransactionQuery(user?.email!);

  const budget = budgetData?.budget || 1;
  const spend = spentData?.amount || 0;
  const ratio = (spend / budget) * 100;

  if (budgetLoading || spendLoading)
    return (
      <div className='flex min-h-[150px] items-center justify-center rounded-md border border-gray-400 dark:border-white'>
        <Loader />
      </div>
    );

  const onBudgetDialogClose = () => setBudgetDialog(false);

  return (
    <div className='space-y-5 rounded-md border border-gray-400 p-5 dark:border-white lg:space-y-3'>
      <div className='mb-6 flex items-center justify-between'>
        <h3 className='text-2xl font-semibold tracking-wide'>Budget Tracker</h3>
        <Dialog.Dialog open={budgetDialog} onOpenChange={setBudgetDialog}>
          <Dialog.DialogTrigger asChild>
            <div className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border bg-transparent p-2 sm:h-10 sm:w-10'>
              <AiFillEdit />
            </div>
          </Dialog.DialogTrigger>

          <Dialog.DialogOverlay>
            <Dialog.DialogContent>
              <Dialog.DialogTitle>Add or Edit Budget</Dialog.DialogTitle>
              <AddEditBudget onBudgetDialogClose={onBudgetDialogClose} />
            </Dialog.DialogContent>
          </Dialog.DialogOverlay>
        </Dialog.Dialog>
      </div>

      {budgetData?.budget ? (
        <>
          <div className='flex items-center justify-between text-lg font-semibold'>
            <p>Budget : {budget} </p>
            <p>Spent : {spend} </p>
          </div>
          <div className='h-10 overflow-hidden rounded-md border border-gray-400 dark:border-white'>
            <div
              className={twMerge(
                'flex h-full items-center rounded bg-indigo-700',
                ratio > 50 ? 'bg-amber-700' : '',
                ratio > 80 ? 'bg-orange-900' : '',
                ratio > 100 ? 'bg-red-900' : '',
              )}
              style={{
                width: `${ratio < 100 ? ratio : 100}%`,
                minWidth: 'fit-content',
              }}
            >
              <div className='ml-auto px-3 text-white'>{ratio.toFixed(1)}%</div>
            </div>
          </div>
          {ratio > 50 && ratio < 80 && (
            <p className='mt-2 flex items-center gap-2 text-sm text-amber-500'>
              <GiSevenPointedStar />
              Your have already spend {spend} Taka. You might wanna be cautions
              from now on.
            </p>
          )}
          {ratio >= 80 && ratio < 100 && (
            <p className='mt-2 flex items-center gap-2 text-sm text-orange-500'>
              <GiSevenPointedStar />
              Please be careful, you almost reached to your budget limit.
            </p>
          )}
          {ratio >= 100 && (
            <p className='mt-2 flex items-center gap-2 text-sm text-red-500'>
              <GiSevenPointedStar />
              You have exceeded your monthly limit.
            </p>
          )}
        </>
      ) : (
        <p className='mt-3 text-lg font-semibold'>Please Add Your Budget</p>
      )}
    </div>
  );
}
