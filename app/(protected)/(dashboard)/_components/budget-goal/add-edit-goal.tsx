'use client';
import { FormInput } from '@/components/shared/form-input';
import { Loader } from '@/components/shared/loader';
import { useGetUser } from '@/hooks/use-get-user';
import { useAddEditGoalMutation } from '@/redux/services/api';
import { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { errorToast, generalToast } from '@/helpers/toast-helper';

type AddEditGoalProps = {
  onGoalDialogClose: () => void;
};
export function AddEditGoal({ onGoalDialogClose }: AddEditGoalProps) {
  const { user } = useGetUser();
  const [addEditGoal, { isLoading }] = useAddEditGoalMutation();
  function onAddEdit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement & {
      goal: { value: string };
    };
    const goal = parseInt(form.goal.value);
    addEditGoal({ email: user?.email, goal })
      .unwrap()
      .then((res) => {
        generalToast(res.msg, res.ok);
        if (res.ok) onGoalDialogClose();
      })
      .catch(() => errorToast());
  }
  return (
    <form onSubmit={onAddEdit} className='space-y-5'>
      <FormInput
        name='goal'
        placeholder='Input Budget Amount'
        title='Amount'
        type='number'
        min={1}
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
