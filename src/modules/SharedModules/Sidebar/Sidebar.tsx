import {
  Home,
  Users,
  Layers,
  FileText,
  BarChart3,
  ClipboardList,
  HelpCircle,
  type LucideProps,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import type { RootState } from "@/store/DefaultStore";
import { useSelector } from "react-redux";

interface SidebarProps {
  className?: string;
}

interface menuItemsProp {
  id: string;
  label: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  path: string;
}

const menuItemsInstructor = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Home,
    path: "/dashboard",
  },
  {
    id: "groups",
    label: "Groups",
    icon: Layers,
    path: "/dashboard/group-crud",
  },
  {
    id: "questions",
    label: "Questions",
    icon: FileText,
    path: "/dashboard/questions",
  },
  {
    id: "quizzes",
    label: "Quizzes",
    icon: ClipboardList,
    path: "/dashboard/quizes",
  },
  {
    id: "students",
    label: "Students",
    icon: Users,
    path: "/dashboard/student",
  },
  {
    id: "results",
    label: "Results",
    icon: BarChart3,
    path: "/dashboard/results",
  },
  {
    id: "help",
    label: "Help",
    icon: HelpCircle,
    path: "/dashboard/help",
  },
];

const menuItemsStudent = [
  {
    id: "quizzes",
    label: "Quizzes",
    icon: ClipboardList,
    path: "/dashboard/quizes",
  },
  {
    id: "results",
    label: "Results",
    icon: BarChart3,
    path: "/dashboard/student-results",
  },
  {
    id: "help",
    label: "Help",
    icon: HelpCircle,
    path: "/dashboard/help",
  },
];
export default function Sidebar({ className }: SidebarProps) {
  const user = useSelector((state: RootState) => state.auth.user);

  const [menuItems, setMenuItems] = useState<menuItemsProp[]>();

  useEffect(() => {
    if (user?.role === "Instructor") {
      setMenuItems(menuItemsInstructor);
    }
    setMenuItems(menuItemsStudent);
  }, []);
  const pathname = useLocation().pathname;
  return (
    <aside
      className={cn(
        "w-48 bg-white border-r border-gray-200 h-screen fixed left-0 top-16 z-40",
        className
      )}
    >
      <nav className="py-4">
        <ul className="space-y-1">
          {menuItems?.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  end={item.id === "dashboard"}
                  className="w-full flex items-center gap-3 px-6 py-5 text-left transition-colors border-b"
                >
                  <Icon
                    size={35}
                    className={`${
                      item.path === pathname
                        ? "bg-[#0D1321] text-white"
                        : "bg-[#FFEDDF] text-black"
                    } rounded-md `}
                  />
                  <span className="text-sm">{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
