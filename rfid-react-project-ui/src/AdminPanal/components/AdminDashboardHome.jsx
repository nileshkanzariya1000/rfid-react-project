import React from "react";
import Cookies from "js-cookie";
import {
  UserGroupIcon,
  AcademicCapIcon,
  ChartBarIcon,
  ClockIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const AdminDashboardHome = () => {
  const adminData = JSON.parse(Cookies.get("admin_data") || "{}");
  const adminName = adminData.admin_name || "Admin";

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="p-6">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          {getGreeting()}, {adminName}! 👋
        </h1>
        <p className="text-gray-600 text-lg">
          Here’s what’s happening in your system today
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value="128"
          icon={<UserGroupIcon className="w-8 h-8 text-blue-600" />}
          color="blue"
        />
        <StatCard
          title="Subjects"
          value="24"
          icon={<AcademicCapIcon className="w-8 h-8 text-green-600" />}
          color="green"
        />
        <StatCard
          title="Today Attendance"
          value="92%"
          icon={<ChartBarIcon className="w-8 h-8 text-purple-600" />}
          color="purple"
        />
        <StatCard
          title="Recent Logs"
          value="18"
          icon={<ClockIcon className="w-8 h-8 text-orange-600" />}
          color="orange"
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Quick Admin Actions
          </h2>

          <div className="space-y-4">
            <AdminLink to="/AdminDashboard/ManageUsers" label="Manage Users" />
            <AdminLink to="/AdminDashboard/AdminTokensDetails" label="Manage Tokens" />
            <AdminLink to="/AdminDashboard/attendance" label="attendance" />
          </div>
        </div>

        {/* Right */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Recent Activity
          </h2>

          <ul className="space-y-3 text-sm text-gray-600">
            <li>✔ New subject added</li>
            <li>✔ Attendance updated</li>
            <li>✔ User profile edited</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;

/* Reusable Components */

const StatCard = ({ title, value, icon, color }) => (
  <div
    className={`bg-white rounded-xl shadow-lg p-6 border-l-4 border-${color}-500 hover:shadow-xl transition transform hover:scale-105`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      </div>
      <div className={`bg-${color}-100 p-3 rounded-full`}>{icon}</div>
    </div>
  </div>
);

const AdminLink = ({ to, label }) => (
  <Link
    to={to}
    className="flex items-center justify-between p-4 bg-gray-50 hover:bg-blue-50 rounded-lg transition"
  >
    <span className="font-medium text-gray-700">{label}</span>
    <ArrowRightIcon className="w-4 h-4 text-gray-400" />
  </Link>
);
