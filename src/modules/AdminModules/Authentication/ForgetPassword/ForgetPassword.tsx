import { useState } from "react";
import { useForgotPasswordMutation } from "../../../../store/auth/AuthApi";
import { MdEmail, MdCheck } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword({ email }).unwrap();
      toast.success("Reset email sent successfully!");
      setTimeout(() => {
        navigate("/reset-password");
      }, 1500);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to send email.");
    }
  };

  return (
    <div className=" mt-15 flex items-start justify-start">
      <div className="rounded-2xl w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div className="mb-20">
            <label className="text-white block mb-1">Email</label>
            <div className="flex items-center border-2 border-white rounded-xl px-3 py-2">
              <MdEmail className="text-white mr-2" size={20} />
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full outline-none bg-transparent text-white placeholder-white"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 bg-white text-black py-2 px-4 rounded-xl transition hover:bg-black hover:text-white"
            >
              Send Email{" "}
              <MdCheck
                size={18}
                className="w-5 h-5 bg-black text-white rounded-full p-1"
              />
            </button>
          </div>
        </form>

        <p className="mt-6 text-right text-sm text-gray-400">
          Login?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Click here
          </span>
        </p>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default ForgetPassword;
