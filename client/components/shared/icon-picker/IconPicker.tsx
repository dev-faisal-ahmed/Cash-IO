'use client';

import * as customForm from '@/components/ui/form';
import * as dropDownMenu from '@/components/ui/dropdown-menu';
import { IoAddSharp } from 'react-icons/io5';
import { FiSearch } from 'react-icons/fi';
import { IconContainer } from './IconContainer';
import { icons } from './icons';
import { ChangeEvent, useState } from 'react';
import { Input } from '@/components/ui/input';

type TProps = {
  form: any;
  name: string;
  defaultIcon?: string;
  details?: string;
};

export const IconPicker = ({ form, name, details, defaultIcon }: TProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [allIcons, setAllIcons] = useState(Object.keys(icons));

  const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const key = event.target.value;
    if (!key) setAllIcons(Object.keys(icons));
    else
      setAllIcons(
        Object.keys(icons).filter((eachKey) =>
          eachKey.toLowerCase().includes(key.toLowerCase()),
        ),
      );
  };

  return (
    <customForm.FormField
      control={form.control}
      name={name}
      defaultValue={defaultIcon}
      render={({ field }) => (
        <customForm.FormItem>
          <dropDownMenu.DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <dropDownMenu.DropdownMenuTrigger asChild>
              <div className='flex min-h-[150px] cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-input'>
                {field.value ? (
                  <IconContainer className='text-6xl' name={field.value} />
                ) : (
                  <>
                    <IoAddSharp className='text-4xl' />
                    <p>Click to add icon</p>
                  </>
                )}
              </div>
            </dropDownMenu.DropdownMenuTrigger>
            <dropDownMenu.DropdownMenuContent className='mt-2'>
              <div className='relative mb-2'>
                <Input
                  onChange={onSearch}
                  className='pl-10'
                  placeholder='Write Keyword'
                />
                <FiSearch
                  size={18}
                  className='absolute left-3 top-1/2 -translate-y-1/2'
                />
              </div>
              <div className='grid max-h-[200px] w-[250px] grid-cols-4 gap-4 overflow-y-auto bg-card p-4'>
                {allIcons.map((icon) => (
                  <div
                    onClick={() => {
                      field.onChange(icon);
                      setIsOpen(false);
                      setAllIcons(Object.keys(icons));
                    }}
                    key={icon}
                    className='min-w-[40px] flex-1 text-3xl'
                  >
                    <IconContainer name={icon} />
                  </div>
                ))}
              </div>
            </dropDownMenu.DropdownMenuContent>
          </dropDownMenu.DropdownMenu>
          <customForm.FormDescription>{details}</customForm.FormDescription>
          <customForm.FormMessage />
        </customForm.FormItem>
      )}
    />
  );
};
