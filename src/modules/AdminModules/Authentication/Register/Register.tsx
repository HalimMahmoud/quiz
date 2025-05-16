import {  registerSchema, type RegisterFormData } from "@/features/validationSchema";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from 'react-hook-form';
import type { ErrorResponse } from '@/interfaces/errors.interfaces';
import { toast } from "sonner";
import PasswordInput from "@/components/form/PasswordInput";
import SubmitButton from "@/components/form/SubmitButton";
import { FaEnvelope, FaSpinner,FaAddressCard } from "react-icons/fa6";
import { RiAdminLine } from "react-icons/ri";
import { useState } from "react";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { useRegisterMutation } from "@/store/auth/AuthApi";
import { Link, useNavigate } from "react-router-dom";
import LoginDialog from "../Login/LoginDialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Register() {
  const [register] = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      first_name:'',
      last_name:'',
      role:"Student",
      email: '',
      password: '',
    },
  });

  const { formState: { isSubmitting } } = form;

  const onSubmit: SubmitHandler<RegisterFormData> = async (values) => {
    try {
      const response = await register(values).unwrap();
      toast.success(response?.data?.message || "Registration successful")
      navigate('/login')

    } catch (error) {
      toast.error((error as ErrorResponse)?.data?.message || "Error registering")
    }
  };
  
  return (
    <>
      <div className="text-white">
        <LoginDialog />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-10">
            <div className="flex items-center justify-between gap-5">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Your First Name</FormLabel>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white">
                        <FaAddressCard size={16} />
                      </div>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Type your First Name"
                          {...field}
                          className="pl-10 pr-10 placeholder:text-white" 
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="me-auto" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Your Last Name</FormLabel>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white">
                        <FaAddressCard size={16} />
                      </div>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Type your Last Name"
                          {...field}
                          className="pl-10 pr-10 placeholder:text-white" 
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="me-auto" />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Select your role</FormLabel>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white z-10">
                      <RiAdminLine size={16} />
                    </div>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full pl-10 text-white">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0D1321] text-white border-white">
                          <SelectGroup>
                            <SelectItem value="Instructor" className="text-white hover:text-[#0D1321] ">Instructor</SelectItem>
                            <SelectItem value="Student" className="text-white hover:text-[#0D1321]">Student</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                  <FormMessage className="me-auto" />
                </FormItem>
              )}
            />
            
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
                loadingText="Registering..."
                buttonText="Register"
                icon={<FaSpinner size={16} />}
              />
              <div>
                <p className="fw-bold"> Already have an account? <Link to={'/login'} className="text-[#C5D86D]">Login Here</Link></p>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </>
  )
}