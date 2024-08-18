'use client';

import * as customForm from '@/components/ui/form';
import * as dropDownMenu from '@/components/ui/dropdown-menu';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { IoAddSharp } from 'react-icons/io5';
import { FiSearch } from 'react-icons/fi';
import { IconContainer } from './IconContainer';
import { icons } from './icons';
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
  const [width, setWidth] = useState(0);
  const triggerRef = useRef<HTMLDivElement>(null);

  // setting the width of the dorpDownContent with respect to dropDownTrigger
  useEffect(() => {
    if (triggerRef.current) setWidth(triggerRef.current?.clientWidth);
  }, []);

  // handling search
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
              <div
                ref={triggerRef}
                className='flex min-h-[150px] cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-input'
              >
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
            <dropDownMenu.DropdownMenuContent
              style={{ width: width + 10 }}
              className='mt-2 w-full'
            >
              {/* search */}
              <div className='relative mb-2'>
                <FiSearch
                  size={18}
                  className='absolute left-3 top-1/2 -translate-y-1/2'
                />
                <Input
                  onChange={onSearch}
                  className='pl-10'
                  placeholder='Write Keyword'
                />
              </div>

              {/* icons grid */}
              <div className='grid max-h-[200px] w-full grid-cols-5 gap-4 overflow-y-auto bg-card p-4'>
                {allIcons.map((icon) => (
                  <div
                    onClick={() => {
                      field.onChange(icon);
                      setIsOpen(false);
                      setAllIcons(Object.keys(icons));
                    }}
                    key={icon}
                    className='cursor-pointer text-3xl'
                  >
                    <IconContainer name={icon} />
                  </div>
                ))}
              </div>
            </dropDownMenu.DropdownMenuContent>
          </dropDownMenu.DropdownMenu>
          {details && (
            <customForm.FormDescription>{details}</customForm.FormDescription>
          )}
          <customForm.FormMessage />
        </customForm.FormItem>
      )}
    />
  );
};
