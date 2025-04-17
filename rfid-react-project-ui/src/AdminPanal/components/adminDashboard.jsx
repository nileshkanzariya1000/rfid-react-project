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
    <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="\rfid-svgrepo-com.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Admin Dashboard</title>
  </head>
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AdminSideNavbar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div
        className={`flex-1 ${isSidebarOpen ? "ml-72" : "ml-16"} p-6 bg-gray-100 overflow-auto transition-all duration-300`}
      >
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        {/* Render nested routes here */}
        <Outlet />
      </div>
    </div>
    </>
  );
};

export default AdminDashboard;