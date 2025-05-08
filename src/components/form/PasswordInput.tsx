import React from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { Control } from 'react-hook-form';

interface PasswordInputProps {
  label: string;
  name: 'password' | 'password_new';
  control: Control<{ password: string; password_new: string }>;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  name,
  control,
  showPassword,
  setShowPassword,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field}) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="relative">
            <FormControl>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder={`Enter ${label.toLowerCase()}`}
                {...field}
                className="pr-10"
              />
            </FormControl>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
          </div>
          <FormMessage className='me-auto' />
        </FormItem>
      )}
    />
  );
};

export default PasswordInput;
