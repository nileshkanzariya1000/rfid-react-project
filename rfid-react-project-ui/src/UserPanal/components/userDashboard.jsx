import React, { useState } from "react";
import UserSideNavbar from "./userSideNavbar";
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
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <UserSideNavbar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-72" : "lg:ml-16"
        }`}
      >
        <div className="min-h-screen bg-gray-100">
          {/* Render nested routes */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
