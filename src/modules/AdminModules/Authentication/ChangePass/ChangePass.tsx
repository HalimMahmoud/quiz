import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {  useForm} from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa';
import { useChangePasswordMutation } from '@/store/auth/AuthApi';
import PasswordInput from '@/components/form/PasswordInput';
import SubmitButton from '@/components/form/SubmitButton';
import { Form } from '@/components/ui/form';
import { toast } from "sonner"
import { changePasswordSchema  } from '@/features/validationSchema';
import type {  SubmitHandler } from 'react-hook-form'; 
import type { ErrorResponse } from '@/interfaces/errors.interfaces';
import type{  ChangePasswordFormData } from '@/features/validationSchema';


const ChangePassword = () => {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [changePassword] = useChangePasswordMutation();

  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: '',
      password_new: '',
    },
  });

  const { formState: { isSubmitting } } = form;

  const onSubmit:SubmitHandler<ChangePasswordFormData> = async (values) => {
    try {
      const response = await changePassword(values).unwrap();
      console.log('Password changed successfully', response);
      toast.success("Password changed successfully")
    } catch (error  ) {
      console.error('Error changing password', error);
      toast.error( (error as ErrorResponse)?.data?.message || "Error changing password")
    }
  };

  return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Old Password */}
            <PasswordInput
              label="Old Password"
              name="password"
              control={form.control}
              showPassword={showOld}
              setShowPassword={setShowOld}
            />

            {/* New Password */}
            <PasswordInput
              label="New Password"
              name="password_new"
              control={form.control}
              showPassword={showNew}
              setShowPassword={setShowNew}
            />

            {/* Submit Button */}
            <SubmitButton
              isSubmitting={isSubmitting}
              loadingText="Submitting..."
              buttonText="Submit"
              icon={<FaSpinner size={16} />}
            />
          </form>
        </Form>

  );
};

export default ChangePassword;
