'use client';

import * as Dialog from '@/components/ui/dialog';
import { useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { AddEditGoal } from './add-edit-goal';
import { useGetUser } from '@/hooks/use-get-user';
import { Loader } from '@/components/shared/loader';
import { useGetGoalQuery, useGetSavingsQuery } from '@/redux/services/api';

export function GoalBox() {
  const { user } = useGetUser();
  const { data: savingData, isLoading: savingLoading } = useGetSavingsQuery(
    user?.email!,
  );
  const { data: goalData, isLoading: goalLoading } = useGetGoalQuery(
    user?.email!,
  );

  console.log(goalData);

  const goal = goalData?.goal || 1;
  const saving = (savingData?.revenue || 0) - (savingData?.expense || 0);
  const ratio = (saving / goal) * 100;

  const [goalDialog, setGoalDialog] = useState(false);
  const onBudgetDialogClose = () => setGoalDialog(false);

  if (savingLoading || goalLoading)
    return (
      <div className='flex min-h-[150px] items-center justify-center rounded-md border border-gray-400 dark:border-white'>
        <Loader />
      </div>
    );

  return (
    <div className='space-y-5 rounded-md border border-gray-400 p-5 dark:border-white lg:space-y-3'>
      <div className='mb-6 flex items-center justify-between'>
        <h3 className='text-xl font-semibold tracking-wide'>Goal Tracker</h3>
        <Dialog.Dialog open={goalDialog} onOpenChange={setGoalDialog}>
          <Dialog.DialogTrigger asChild>
            <div className='cursor-pointer rounded-md border bg-transparent p-2'>
              <AiFillEdit className='text-xl' />
            </div>
          </Dialog.DialogTrigger>
          <Dialog.DialogOverlay>
            <Dialog.DialogContent>
              <Dialog.DialogTitle>Add or Update Goal</Dialog.DialogTitle>
              <AddEditGoal onGoalDialogClose={onBudgetDialogClose} />
            </Dialog.DialogContent>
          </Dialog.DialogOverlay>
        </Dialog.Dialog>
      </div>
      {goalData?.goal ? (
        <>
          <div className='flex items-center justify-between font-semibold'>
            <p>Gaol : {goal} </p>
            <p>Savings : {saving} </p>
          </div>
          <div className='h-10 overflow-hidden rounded-md border border-gray-400 dark:border-white'>
            <div
              className={'flex h-full items-center rounded bg-indigo-700'}
              style={{
                width: `${ratio < 100 ? ratio : 100}%`,
                minWidth: 'fit-content',
              }}
            >
              <div className='ml-auto px-3 text-white'>{ratio.toFixed(1)}%</div>
            </div>
          </div>
        </>
      ) : (
        <p className='mt-3 text-lg font-semibold'>Please Add Your Goal</p>
      )}
    </div>
  );
}
