import type { RootState } from "@/store/DefaultStore";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function StudentLayout() {
  const token = useSelector((state: RootState) => state.auth.token);

  const user = useSelector((state: RootState) => state.auth.user);
  if (token && user?.role !== "Student") {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <Outlet />
    </div>
  );
}
