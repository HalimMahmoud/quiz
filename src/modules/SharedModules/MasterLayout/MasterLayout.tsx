import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

export default function MasterLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Navbar */}
      <Navbar onMenuClick={toggleSidebar} />
      
      {/* Sidebar - Fixed position, only render when open */}
      {sidebarOpen && (
        <Sidebar />
      )}
      
      {/* Main content area with proper spacing */}
      <main className={`transition-all duration-300 pt-12 ${
        sidebarOpen ? 'ml-48' : 'ml-0'
      }`}>
        <div className="p-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}