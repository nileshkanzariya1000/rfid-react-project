import React, { useState } from "react";
import UserSideNavbar from "./UserSideNavbar";
import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const UserDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar state
  const userData = Cookies.get("user_data");

  // Redirect to login if no user data is found
  if (!userData) {
    window.location.href = "/UserLogin";
  }

  return (
    <div>
    <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="\rfid-svgrepo-com.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>User Dashboard</title>
  </head>
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <UserSideNavbar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div
        className={`flex-1 ${isSidebarOpen ? "ml-72" : "ml-16"} p-6 bg-gray-100 overflow-auto transition-all duration-300`}
      >
        <h1 className="text-2xl font-semibold">User Dashboard</h1>
        {/* Render nested routes */}
        <Outlet />
      </div>
    </div>
    </div>
  );
};

export default UserDashboard;
