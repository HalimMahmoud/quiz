import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import logo from "../../../assets/Logo.png";
import auth_pic from "../../../assets/auth-pic.png";
import type { RootState } from "@/store/auth/AuthLoaded";
export default function AuthLayout() {
  const token = useSelector((state: RootState) => state.auth.token);
  const location = useLocation();

  if (token) {
    return <Navigate to="/dashboard" />;
  }

  const pathname = location.pathname;

  const pageKey = pathname.split("/").filter(Boolean).pop() as string;
  const headline: Record<string, string> = {
    login: "Continue your learning journey with QuizWiz!",
    register: "Create your account and start using QuizWiz!",
    "forget-password": "Forgot password",
    "reset-password": "Reset password",
    "change-password": "Change password",
  };
  return (
    <>
      <div className="grid md:grid-cols-2 bg-[#0D1321] w-full  p-[50px]">
        <div>
          <div className="text-white mb-10">
            <img src={logo} alt="logo" />
          </div>
          <h1 className="text-[#C5D86D] text-[25px]">{headline[pageKey]}</h1>
          <Outlet />
        </div>

        <div className="flex justify-end h-dvh ">
          <div className="bg-light_cream bg-[#FFEDDF] hidden p-8 md:flex justify-center items-center rounded-2xl">
            <img
              src={auth_pic}
              alt="auth-pic"
              className="w-[450px] h-[450px]  "
            />
          </div>
        </div>
      </div>
    </>
  );
}
