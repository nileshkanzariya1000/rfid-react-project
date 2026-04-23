import React, { useState } from "react";
import AdminSideNavbar from "./AdminSideNavbar";
import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to track if sidebar is open
  const adminData = Cookies.get("admin_data");
  
  // If no admin data is found, redirect to login
  if (!adminData) {
    window.location.href = "/";
  }

  return (
    <>

    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AdminSideNavbar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div
        className={`flex-1 ${isSidebarOpen ? "ml-72" : "ml-20"} bg-[#f4f7fe] min-h-screen overflow-auto transition-all duration-300 relative`}
      >
        {/* Render nested routes here */}
        <Outlet />
      </div>
    </div>
    </>
  );
};

export default AdminDashboard;