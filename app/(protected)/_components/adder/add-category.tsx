'use client';
import { FormEvent, useState } from 'react';
import { FormInput } from '@/components/shared/form-input';
import { IconPicker } from '@/components/shared/icon-picker';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import * as Select from '@/components/ui/select';
import { useGetIcons } from '@/hooks/use-get-icons';
import { toast } from '@/components/ui/use-toast';
import { serverAddress } from '@/data/server-address';
import { serverReq } from '@/helpers/server-req';
import { Loader } from '@/components/shared/loader';
import { useGetUser } from '@/hooks/use-get-user';

type AddCategoryProps = {
  onDialogClose: () => void;
};

export function AddCategory({ onDialogClose }: AddCategoryProps) {
  const [type, setType] = useState<string>();
  const [loading, setLoading] = useState(false);
  const { allIconsData, handleIconSelection, selectedIcon } = useGetIcons();
  const { user } = useGetUser();

  function handleChange(value: string) {
    setType(value);
  }

  function onAddCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLInputElement & {
      name: { value: string };
    };

    const formData = {
      name: form.name.value,
      type,
      icon: selectedIcon,
      email: user?.email,
    };

    if (!type || !selectedIcon)
      return toast({
        title: 'You have to select both icon and category type',
        variant: 'destructive',
        duration: 1000,
      });

    setLoading(true);
    const url = `${serverAddress}/api/add-category`;
    fetch(url, serverReq('POST', formData))
      .then((response) => response.json())
      .then((data) => {
        toast({
          title: data.msg,
          variant: data.ok ? 'default' : 'destructive',
          duration: 1000,
        });
        if (data.ok) onDialogClose();
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: 'Error Occurred',
          variant: 'destructive',
          duration: 1000,
        });
      })
      .finally(() => setLoading(false));
  }

  return (
    <form onSubmit={onAddCategory}>
      {selectedIcon && (
        <div className='mb-5 rounded-lg border p-5 text-9xl'>
          <span className='mx-auto block w-fit'>
            {allIconsData[selectedIcon]}
          </span>
        </div>
      )}

      <FormInput
        title='Category Name'
        name='name'
        type='text'
        placeholder='Input Category Name'
        required
      />
      <div className='mt-5 flex w-full items-center gap-5'>
        <div className='w-full space-y-3'>
          <Label>Icon</Label>
          <IconPicker
            className='w-full'
            handleSelection={handleIconSelection}
          />
        </div>
        <div className='w-full space-y-3'>
          <Label htmlFor='type'>Type</Label>
          <Select.Select onValueChange={handleChange}>
            <Select.SelectTrigger id='type'>
              <Select.SelectValue placeholder='Select Type' />
            </Select.SelectTrigger>
            <Select.SelectContent>
              <Select.SelectItem value='expense'>Expense</Select.SelectItem>
              <Select.SelectItem value='revenue'>Revenue</Select.SelectItem>
            </Select.SelectContent>
          </Select.Select>
        </div>
      </div>
      {loading ? (
        <div className='ml-auto mt-8 w-fit cursor-not-allowed rounded-md border px-3 py-2'>
          <Loader />
        </div>
      ) : (
        <Button className='ml-auto mt-8 block'>Add Category</Button>
      )}
    </form>
  );
}
