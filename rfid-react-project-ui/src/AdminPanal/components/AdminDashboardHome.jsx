import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { fetchAdminDashboardStats } from "../service/api";
import {
  Users,
  Building2,
  Activity,
  Clock,
  ChevronRight,
  Sun,
  ShieldCheck,
  CheckCircle,
  XCircle,
  TrendingUp,
  Zap
} from "lucide-react";

const AdminDashboardHome = () => {
  const adminData = JSON.parse(Cookies.get("admin_data") || "{}");
  const adminName = adminData.username || "Admin";

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStats = async () => {
      try {
        const response = await fetchAdminDashboardStats();
        if (response?.success) {
          setDashboardData(response.data);
        } else {
          setError("Failed to fetch dashboard statistics.");
        }
      } catch (err) {
        console.error("Failed to load dashboard stats:", err);
        setError("Could not load live data.");
      } finally {
        setLoading(false);
      }
    };

    getStats();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const stats = dashboardData?.stats || {};

  return (
    <div className="p-5 lg:p-8 font-sans min-h-screen">
      
      {/* ── Breadcrumb ───── */}
      <div className="flex items-center text-sm font-semibold text-gray-400 mb-6">
        <ShieldCheck className="w-4 h-4 mr-1.5 text-green-500" />
        <span className="text-green-600 uppercase tracking-wider">Admin</span>
        <ChevronRight className="w-4 h-4 mx-1" />
        <span className="text-green-600 font-bold">Dashboard</span>
        <div className="ml-2 w-0.5 h-4 bg-green-500" style={{ transform: "skewX(-15deg)" }} />
      </div>

      {/* ── Welcome Banner ───── */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="bg-amber-50 p-3 rounded-xl">
            <Sun className="w-8 h-8 text-amber-400" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900">
              {getGreeting()}, {adminName}! 👋
            </h2>
            <p className="text-gray-400 text-sm mt-0.5">
              Here's what's happening in your system today
            </p>
          </div>
        </div>
      </div>

      {/* ── Stat Cards ───── */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-28 bg-white rounded-2xl shadow-sm border border-gray-100 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          
          {/* Users Card */}
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-5 shadow-sm border border-blue-100" style={{ borderLeftWidth: "4px", borderLeftColor: "#3b82f6" }}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide">Total Users</p>
                <h3 className="text-4xl font-extrabold text-gray-900 mt-1 leading-none">
                  {stats.total_users ?? "—"}
                </h3>
              </div>
              <div className="bg-blue-100 p-2.5 rounded-xl">
                <Users className="w-5 h-5 text-blue-600" strokeWidth={2} />
              </div>
            </div>
          </div>

          {/* Clients Card */}
          <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-5 shadow-sm border border-green-100" style={{ borderLeftWidth: "4px", borderLeftColor: "#22c55e" }}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide">Total Clients</p>
                <h3 className="text-4xl font-extrabold text-gray-900 mt-1 leading-none">
                  {stats.total_clients ?? "—"}
                </h3>
              </div>
              <div className="bg-green-100 p-2.5 rounded-xl">
                <Building2 className="w-5 h-5 text-green-600" strokeWidth={2} />
              </div>
            </div>
          </div>

          {/* Active Tokens Card */}
          <div className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl p-5 shadow-sm border border-indigo-100" style={{ borderLeftWidth: "4px", borderLeftColor: "#6366f1" }}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide">Active Tokens</p>
                <h3 className="text-4xl font-extrabold text-gray-900 mt-1 leading-none">
                  {stats.active_tokens ?? "—"}
                </h3>
              </div>
              <div className="bg-indigo-100 p-2.5 rounded-xl">
                <Activity className="w-5 h-5 text-indigo-600" strokeWidth={2} />
              </div>
            </div>
          </div>

          {/* Attendance Card */}
          <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl p-5 shadow-sm border border-amber-100" style={{ borderLeftWidth: "4px", borderLeftColor: "#f59e0b" }}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide">Today's Attendance</p>
                <h3 className="text-4xl font-extrabold text-gray-900 mt-1 leading-none">
                  {stats.today_attendance ?? "—"}
                </h3>
              </div>
              <div className="bg-amber-100 p-2.5 rounded-xl">
                <Clock className="w-5 h-5 text-amber-600" strokeWidth={2} />
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ── Error Banner (non-blocking) ───── */}
      {error && (
        <div className="bg-amber-50 text-amber-700 border border-amber-200 p-3 rounded-xl text-xs font-medium mb-6 flex items-center gap-2">
          <Zap className="w-4 h-4 flex-shrink-0" />
          {error} — Stats above may be unavailable. Please restart backend server.
        </div>
      )}

      {/* ── Main Grid ───── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left - Quick Actions */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-base font-bold text-gray-800 mb-5 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            Quick Admin Actions
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/AdminDashboard/ManageUsers"
              className="flex items-center justify-between p-4 bg-gray-50 hover:bg-blue-50 rounded-xl transition-all group border border-transparent hover:border-blue-200 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <span className="font-semibold text-sm text-gray-800">Manage Users</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </Link>
            
            <Link
              to="/AdminDashboard/ManageClients"
              className="flex items-center justify-between p-4 bg-gray-50 hover:bg-green-50 rounded-xl transition-all group border border-transparent hover:border-green-200 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Building2 className="w-4 h-4 text-green-600" />
                </div>
                <span className="font-semibold text-sm text-gray-800">Manage Clients</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-green-500 transition-colors" />
            </Link>
            
            <Link
              to="/AdminDashboard/AdminTokensDetails"
              className="flex items-center justify-between p-4 bg-gray-50 hover:bg-indigo-50 rounded-xl transition-all group border border-transparent hover:border-indigo-200 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-indigo-600" />
                </div>
                <span className="font-semibold text-sm text-gray-800">Manage Token Plans</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors" />
            </Link>
            
            <Link
              to="/AdminDashboard/PurchasedTokens"
              className="flex items-center justify-between p-4 bg-gray-50 hover:bg-amber-50 rounded-xl transition-all group border border-transparent hover:border-amber-200 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="bg-amber-100 p-2 rounded-lg">
                  <Zap className="w-4 h-4 text-amber-600" />
                </div>
                <span className="font-semibold text-sm text-gray-800">Purchased Tokens</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
            </Link>
          </div>
        </div>

        {/* Right - Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-base font-bold text-gray-800 mb-5 flex items-center gap-2">
            <Activity className="w-4 h-4 text-green-600" />
            Recent Purchases
          </h3>

          <div className="max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
            <div className="space-y-3 text-sm">
              {loading ? (
                <div className="space-y-3">
                  {[1,2,3,4].map(i => <div key={i} className="h-14 bg-gray-50 rounded-xl animate-pulse" />)}
                </div>
              ) : dashboardData?.recentActivity?.length > 0 ? (
                dashboardData.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors border border-gray-50 hover:border-gray-100">
                    <div className={`mt-0.5 flex-shrink-0 ${activity.status === 0 ? "text-green-500" : "text-gray-300"}`}>
                      {activity.status === 0 ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-gray-800 font-semibold leading-tight truncate">{activity.clientName}</p>
                      <p className="text-gray-500 text-xs truncate">
                        Subject: <span className="font-medium text-gray-600">{activity.subjectName || "—"}</span>
                      </p>
                      <p className="text-gray-400 text-xs mt-0.5">{activity.date}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Activity className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm font-medium">No recent activity yet.</p>
                  <p className="text-gray-300 text-xs mt-1">Activity will appear here once clients make purchases.</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboardHome;
