import { Card } from "@/components/ui/card";
import { Link, useLocation } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa";
import { useMemo } from "react";
export default function LoginDialog() {
  const { pathname } = useLocation();
  const isloginPage = useMemo(() => pathname === "/login", [pathname]);
  return (
    <div>

      {/* Already implemented in authlayout */}
      {/* <h1 className='text-[#C5D86D] text-[25px]'>Continue your learning journey with QuizWiz!</h1> */}
      <div className="flex items-center gap-5 mt-5">
        <Card
          className={`px-10 bg-[#333] ${
            isloginPage
              ? "border-5 border-[#C5D86D]  text-[#C5D86D]"
              : "text-white"
          }`}
        >
          <Link to={"/login"}>
            <FaUserTie className="text-7xl" />
            <p className="text-center fw-bold">Sign In</p>
          </Link>
        </Card>
        <Card
          className={`px-10 bg-[#333] ${
            !isloginPage
              ? "border-5 border-[#C5D86D] text-[#C5D86D]"
              : "text-white"
          }`}
        >
          <Link to={"/register"}>
            <FaUserPlus className="text-7xl" />
            <p className="text-center fw-bold">Sign Up</p>
          </Link>
        </Card>
      </div>
    </div>
  );
}
