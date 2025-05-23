import { Menu, CircleX, CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useLocation } from "react-router-dom";
import bills from "../../../assets/bills.svg";
import { useState } from "react";
import { DialogDemo } from "@/modules/AdminModules/Quizes/QuizDialog";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/DefaultStore";
interface NavbarProps {
  onMenuClick?: () => void;
}

// Map routes to their display titles
const routeTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/group-crud": "Groups",
  "/dashboard/questions": "Quizzes",
  "/dashboard/results": "Results",
};

export default function Navbar({ onMenuClick }: NavbarProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const location = useLocation();
  const currentPath = location.pathname;
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Get title based on current route, fallback to "Dashboard"
  const title = routeTitles[currentPath] || "Dashboard";

  return (
    <header className="bg-white border-b border-gray-200 px-4  grow fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="px-1 py-3 w-[178px] border-e flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuClick}
              className="p-2 hover:bg-gray-100"
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="flex items-center justify-center">
              <CircleX size={33} className="-me-1" />
              <CircleCheck size={33} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            {user?.role ==="Instructor" && <div className="border-e pe-2 py-3">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 border-gray-300 rounded-xl"
                onClick={() => setIsCreateDialogOpen(true)}
              >
                
                <img src={bills} className="w-6 h-full " alt="bills" />
                New quiz
              </Button>
                      <DialogDemo isCreateDialogOpen={isCreateDialogOpen} setIsCreateDialogOpen={setIsCreateDialogOpen}/>

            </div>}

            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/api/placeholder/32/32" alt="User" />
                <AvatarFallback className="bg-gray-300 text-gray-700 text-xs">NC</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">
                  {user?.first_name} {user?.last_name}
                </span>
                <span className="text-xs text-green-600 font-medium">
                  {user?.role === "Instructor" ? "Instructor" : "Student"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
