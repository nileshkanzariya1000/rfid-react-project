// Dashboard.jsx
import React from "react";
import ClientSideNavbar from "./clientSideNavbar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      <ClientSideNavbar />
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-semibold">Client Dashboard</h1>
        {/* Render nested routes here */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
