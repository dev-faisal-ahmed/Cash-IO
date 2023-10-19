import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

type FormInputType = {
  title: string;
  name: string;
  type: 'text' | 'number';
  placeholder: string;
  defaultValue?: string | number;
  required?: boolean;
  disabled?: boolean;
  className?: string;
};

export function FormInput({
  title,
  name,
  type,
  placeholder,
  defaultValue,
  required,
  disabled,
  className,
}: FormInputType) {
  return (
    <div className={`w-full space-y-3 ${className}`}>
      <Label htmlFor={name}>{title}</Label>
      <Input
        autoComplete='off'
        aria-autocomplete='none'
        className='w-full'
        name={name}
        type={type}
        placeholder={placeholder}
        id={name}
        defaultValue={defaultValue}
        required={required}
        disabled={disabled}
      />
    </div>
  );
}
