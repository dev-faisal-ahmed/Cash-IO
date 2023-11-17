'use client';
import { FormInput } from '@/components/shared/form-input';
import { Loader } from '@/components/shared/loader';
import { Button } from '@/components/ui/button';
import { errorToast, generalToast } from '@/helpers/toast-helper';
import { useGetUser } from '@/hooks/use-get-user';
import { useAddEditBudgetMutation } from '@/redux/services/api';
import { FormEvent } from 'react';

type AddEditBudgetProps = {
  onBudgetDialogClose: () => void;
};

export function AddEditBudget({ onBudgetDialogClose }: AddEditBudgetProps) {
  const { user } = useGetUser();
  const [addEditBudget, { isLoading }] = useAddEditBudgetMutation();

  function onAddEdit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement & {
      budget: { value: string };
    };
    const budget = parseInt(form.budget.value);
    addEditBudget({ email: user?.email, budget })
      .unwrap()
      .then((res) => {
        generalToast(res.msg, res.ok);
        if (res.ok) onBudgetDialogClose();
      })
      .catch(() => errorToast());
  }

  return (
    <form onSubmit={onAddEdit} className='space-y-5'>
      <FormInput
        name='budget'
        placeholder='Input Budget Amount'
        title='Amount'
        type='number'
      />
      {isLoading ? (
        <div className='ml-auto mt-8 w-fit rounded-md border px-3 py-2'>
          <Loader />
        </div>
      ) : (
        <Button className='ml-auto block'>Submit</Button>
      )}
    </form>
  );
}
