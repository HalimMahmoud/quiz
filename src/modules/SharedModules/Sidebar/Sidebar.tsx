import { 
  Home, 
  Users, 
  Layers, 
  FileText, 
  BarChart3, 
  HelpCircle 
} from "lucide-react";
import { NavLink, useLocation, useNavigation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface SidebarProps {
  className?: string;
}

const menuItems = [
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
    id: "quizzes",
    label: "Quizzes",
    icon: FileText,
    path: "/dashboard/questions",
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

export default function Sidebar({ 
  className 
}: SidebarProps) {
  const pathname=useLocation().pathname
  return (
    <aside className={cn(
      "w-48 bg-white border-r border-gray-200 h-screen fixed left-0 top-16 z-40",
      className
    )}>
      <nav className="py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            
            return (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  end={item.id === "dashboard"}
                  className="w-full flex items-center gap-3 px-6 py-5 text-left transition-colors border-b"
                >
                    <Icon size={35} className={`${item.path===pathname?"bg-[#0D1321] text-white":"bg-[#FFEDDF] text-black"} rounded-md `}/>
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