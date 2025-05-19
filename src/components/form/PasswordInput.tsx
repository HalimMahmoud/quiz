import React from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import {
  FormField, FormControl, FormItem, FormLabel, FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { IoKey } from "react-icons/io5";

interface PasswordInputProps<T extends FieldValues> {
  label: string;
  name: FieldPath<T>;
  control: Control<T>;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}
const PasswordInput = <T extends FieldValues>({
  label,
  name,
  control,
  showPassword,
  setShowPassword,
}: PasswordInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className='text-white'>{label}</FormLabel>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white">
              <IoKey size={16} />
            </div>
            <FormControl>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder={`Enter ${label.toLowerCase()}`}
                {...field}
                className="pr-10 pl-10  placeholder:text-white"
              />
            </FormControl>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-black"
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
          </div>
          <FormMessage className="me-auto" />
        </FormItem>
      )}
    />
  );
};

export default PasswordInput;