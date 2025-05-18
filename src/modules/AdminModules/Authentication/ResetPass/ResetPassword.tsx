import React, { useState } from "react";
import { useResetPasswordMutation } from "../../../../store/auth/AuthApi";
import { MdEmail, MdLockReset, MdCheck, MdKey } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ResetPassword: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    password: "",
  });

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const nvigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await resetPassword(formData).unwrap();
      toast.success("Password reset successfully!");
      setTimeout(() => {
        nvigate("/login");
      });
      console.log(res);
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="mt-15 flex items-start justify-start">
      <div className="rounded-2xl w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {/* Email */}
          <div className="mb-6">
            <label className="text-white block mb-1">Email</label>
            <div className="flex items-center border-2 border-white rounded-xl px-3 py-2">
              <MdEmail className="text-white mr-2" size={20} />
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full outline-none bg-transparent text-white placeholder-white"
              />
            </div>
          </div>

          {/* OTP */}
          <div className="mb-6">
            <label className="text-white block mb-1">OTP</label>
            <div className="flex items-center border-2 border-white rounded-xl px-3 py-2">
              <MdKey className="text-white mr-2" size={20} />
              <input
                type="text"
                name="otp"
                required
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={handleChange}
                className="w-full outline-none bg-transparent text-white placeholder-white"
              />
            </div>
          </div>

          {/* New Password */}
          <div className="mb-6">
            <label className="text-white block mb-1">New Password</label>
            <div className="flex items-center border-2 border-white rounded-xl px-3 py-2">
              <MdLockReset className="text-white mr-2" size={20} />
              <input
                type="password"
                name="password"
                required
                placeholder="Enter new password"
                value={formData.password}
                onChange={handleChange}
                className="w-full outline-none bg-transparent text-white placeholder-white"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 bg-white text-black py-2 px-4 rounded-xl transition hover:bg-black hover:text-white"
            >
              Reset Password{" "}
              <MdCheck
                size={18}
                className="w-5 h-5 bg-black text-white rounded-full p-1"
              />
            </button>
          </div>
        </form>
        <ToastContainer position="top-center" />
      </div>
    </div>
  );
};

export default ResetPassword;
