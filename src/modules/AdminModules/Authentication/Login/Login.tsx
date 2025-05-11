import { loginSchema, type LoginFormData } from "@/features/validationSchema";
import LoginDialog from "./LoginDialog";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from 'react-hook-form';
import type { ErrorResponse } from '@/interfaces/errors.interfaces';
import { toast } from "sonner";
import PasswordInput from "@/components/form/PasswordInput";
import SubmitButton from "@/components/form/SubmitButton";
import { FaEnvelope, FaSpinner } from "react-icons/fa6";
import { useState } from "react";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/store/auth/AuthApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/auth/AuthSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [login] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { formState: { isSubmitting } } = form;

  const onSubmit: SubmitHandler<LoginFormData> = async (values) => {
    try {
      const response = await login(values).unwrap();
      localStorage.setItem('token', response?.data?.accessToken)
      toast.success(response?.data?.message || "Logged in successfully")
      const payload = { user: response?.data?.profile, token: response?.data?.accessToken }
      dispatch(setUser(payload))
      if (response?.data?.profile?.role == "Instructor") navigate('/dashboard')
      if (response?.data?.profile?.role == "student") navigate('/home')

    } catch (error) {
      toast.error((error as ErrorResponse)?.data?.message || "Error logging in")
    }
  };

  return (
    <>

<div className="bg-[#0D1321]  text-white">

      <LoginDialog />
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-10">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registered email address</FormLabel>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white">
                    <FaEnvelope size={16} />
                  </div>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Type your email"
                      {...field}
                      className="pl-10 pr-10 placeholder:text-white" 
                    />
                  </FormControl>
                </div>
                <FormMessage className="me-auto" />
              </FormItem>
            )}
          />
          <PasswordInput
            label="Password"
            name="password"
            control={form.control}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
          <div className="flex items-center justify-between">
          <SubmitButton
            isSubmitting={isSubmitting}
            loadingText="Logging in..."
            buttonText="Login"
            icon={<FaSpinner size={16} />}
            />
            <div>
              <p className="fw-bold"> Forget Password? <Link to={'/forget-password'} className="text-[#C5D86D]" >Click Here</Link></p>
            </div>
            </div>
        </form>
      </Form>
      </div>
    </>
  );
}