import React, { useState } from "react";
import ClientSideNavbar from "./ClientSideNavbar";
import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to track if sidebar is open
  const clientData = Cookies.get("client_data");
  
  // If no client data is found, redirect to login
  if (!clientData) {
    window.location.href = "/ClientLogin";
  }

  return (
    <div>
    <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="\rfid-svgrepo-com.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Client Dashboard</title>
  </head>
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <ClientSideNavbar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div
        className={`flex-1 ${isSidebarOpen ? "ml-72" : "ml-16"} p-6 bg-gray-100 overflow-auto transition-all duration-300`}
      >
        <h1 className="text-2xl font-semibold">Client Dashboard</h1>
        {/* Render nested routes here */}
        <Outlet />
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
