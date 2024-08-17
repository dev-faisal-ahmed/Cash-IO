'use client';

import * as customForm from '@/components/ui/form';
import { Input } from '../ui/input';
import { useState } from 'react';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';

type TProps = {
  form: any;
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
};

export const PasswordField = ({
  form,
  name,
  label,
  placeholder,
  description,
}: TProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <customForm.FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <customForm.FormItem>
          <customForm.FormLabel>{label}</customForm.FormLabel>
          <div className='relative'>
            <Input
              placeholder={placeholder || '*****'}
              type={isVisible ? 'text' : 'password'}
              {...field}
            />
            <div className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer'>
              {isVisible ? (
                <EyeOpenIcon onClick={() => setIsVisible(false)} />
              ) : (
                <EyeClosedIcon onClick={() => setIsVisible(true)} />
              )}
            </div>
          </div>
          <customForm.FormMessage />
          <customForm.FormDescription>{description}</customForm.FormDescription>
        </customForm.FormItem>
      )}
    />
  );
};
