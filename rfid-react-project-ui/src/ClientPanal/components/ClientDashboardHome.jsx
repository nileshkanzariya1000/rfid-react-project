import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { fetchClientDashboardStats } from "../service/api";
import {
  Users,
  UserCheck,
  UserX,
  Clock,
  Activity,
  BookOpen,
  ChevronRight,
  Sun,
  AlertCircle,
  CheckCircle,
  XCircle,
  TrendingUp,
  Calendar,
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ClientDashboardHome = () => {
  const clientData = Cookies.get("client_data")
    ? JSON.parse(Cookies.get("client_data"))
    : {};
  const clientName = clientData.client_name || "Client";
  const clientId = clientData.client_id;

  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalEmployees: 0,
    presentToday: 0,
    absentToday: 0,
    lateToday: 0,
  });
  const [weeklyData, setWeeklyData] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch dashboard data
  useEffect(() => {
    const loadData = async () => {
      if (!clientId) return;
      try {
        const response = await fetchClientDashboardStats(clientId);
        if (response.success && response.data) {
          setStats(response.data.stats);
          setWeeklyData(response.data.weeklyChart || []);
          setDepartments(response.data.departments || []);
          setRecentActivity(response.data.recentActivity || []);
        }
      } catch (err) {
        setError(err.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [clientId]);

  // Helpers
  const formatTime = (date) =>
    date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

  const formatDate = (date) => {
    const day = date.getDate();
    const suffix =
      ["th", "st", "nd", "rd"][
        day % 10 > 3 ? 0 : (day % 100 - (day % 10)) !== 10 ? day % 10 : 0
      ];
    return `${day}${suffix} ${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`;
  };

  const formatToDDMMYY = (dateString) => {
    if (!dateString) return "—";
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = String(d.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
  };

  const statCards = [
    {
      title: "Total Employees",
      value: stats.totalEmployees,
      desc: "Across all subjects",
      icon: Users,
      iconColor: "text-green-600",
      iconBg: "bg-green-50",
      border: "border-green-500",
      gradient: "from-green-50 to-white",
    },
    {
      title: "Present Today",
      value: stats.presentToday,
      desc: "On time & late",
      icon: UserCheck,
      iconColor: "text-indigo-600",
      iconBg: "bg-indigo-50",
      border: "border-indigo-500",
      gradient: "from-indigo-50 to-white",
    },
    {
      title: "Absent Today",
      value: stats.absentToday,
      desc: "Not punched in",
      icon: UserX,
      iconColor: "text-red-500",
      iconBg: "bg-red-50",
      border: "border-red-400",
      gradient: "from-red-50 to-white",
    },
    {
      title: "Late Arrivals",
      value: stats.lateToday,
      desc: "Arrived past start",
      icon: Clock,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-50",
      border: "border-amber-500",
      gradient: "from-amber-50 to-white",
    },
  ];

  // Bar chart config — from real weekly data
  const barChartData = {
    labels: weeklyData.map((d) => d.dayLabel),
    datasets: [
      {
        label: "Present",
        data: weeklyData.map((d) => d.present),
        backgroundColor: "#22c55e",
        borderRadius: 6,
        barPercentage: 0.6,
        categoryPercentage: 0.8,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { mode: "index", intersect: false } },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
        grid: { color: "#f0f4ff" },
        border: { display: false },
      },
      x: { grid: { display: false }, border: { display: false } },
    },
  };

  // ── Loading ──────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f7fe]">
        <div className="animate-pulse space-y-6">
          <div className="h-6 bg-gray-200 rounded w-52"></div>
          <div className="bg-white rounded-2xl h-36 shadow-sm"></div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-28 shadow-sm"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl h-64 shadow-sm"></div>
            <div className="bg-white rounded-2xl h-64 shadow-sm"></div>
          </div>
        </div>
      </div>
    );
  }

  // ── Error ────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen bg-[#f4f7fe] flex items-center justify-center">
        <div className="bg-white rounded-2xl p-10 shadow-sm text-center max-w-sm">
          <AlertCircle className="w-14 h-14 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-800 mb-2">Failed to load dashboard</h3>
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  // ── Main ─────────────────────────────────────────────────────────
  return (
    <div className="font-sans">

      {/* Welcome + Clock */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-amber-50 p-3 rounded-xl">
              <Sun className="w-8 h-8 text-amber-400" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-[#1b2559]">
                Welcome back, {clientName}! 👋
              </h2>
              <p className="text-gray-400 text-sm mt-0.5">
                Track and manage employee attendance in real-time
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 bg-[#f4f7fe] rounded-xl px-5 py-3">
            <div className="text-center">
              <p className="text-2xl font-light text-gray-700 tracking-tight tabular-nums">
                {formatTime(currentTime)}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">Live Time</p>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div className="text-center">
              <p className="text-base font-bold text-gray-800">{formatDate(currentTime)}</p>
              <p className="text-xs text-gray-400">Today</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((stat, i) => (
          <div
            key={i}
            className={`bg-gradient-to-br ${stat.gradient} rounded-2xl p-5 shadow-sm border-l-4 ${stat.border} border border-gray-100`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide">
                  {stat.title}
                </p>
                <h3 className="text-4xl font-extrabold text-[#1b2559] mt-1 leading-none">
                  {stat.value}
                </h3>
                <p className="text-xs text-gray-400 mt-1.5">{stat.desc}</p>
              </div>
              <div className={`${stat.iconBg} p-2.5 rounded-xl`}>
                <stat.icon className={`w-5 h-5 ${stat.iconColor}`} strokeWidth={2} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Chart + Subjects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

        {/* Weekly Attendance Bar Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
              <Activity className="w-4 h-4 text-green-600" />
              Weekly Attendance
            </h3>
            <span className="text-xs font-semibold bg-green-50 text-green-600 px-2.5 py-1 rounded-full border border-green-100">
              Last 7 days
            </span>
          </div>
          {weeklyData.length === 0 ? (
            <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
              <Activity className="w-10 h-10 text-gray-200 mr-3" />
              No weekly data available
            </div>
          ) : (
            <div className="h-[220px]">
              <Bar data={barChartData} options={barChartOptions} />
            </div>
          )}
        </div>

        {/* Subjects */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-green-600" />
              My Subjects
            </h3>
            <Link to="/ClientDashboard/AddNewSubject">
              <span className="text-xs font-semibold bg-green-50 text-green-600 px-2.5 py-1 rounded-full border border-green-100 hover:bg-green-100 transition-colors cursor-pointer">
                + Add Subject
              </span>
            </Link>
          </div>
          {departments.length === 0 ? (
            <div className="text-center py-10">
              <BookOpen className="w-12 h-12 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 text-sm font-medium">No subjects yet</p>
              <Link to="/ClientDashboard/AddNewSubject">
                <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors">
                  Add Your First Subject
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {departments.map((dept, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-transparent"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 text-green-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {i + 1}
                    </div>
                    <p className="font-semibold text-gray-800 text-sm">{dept.name}</p>
                  </div>
                  <span className="text-xs font-semibold bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full">
                    {dept.count} members
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            Recent Activity
          </h3>
          <Link to="/ClientDashboard/ClientLeaveRequests">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Manage Leaves
            </button>
          </Link>
        </div>

        {recentActivity.length === 0 ? (
          <div className="p-10 text-center">
            <Activity className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 text-sm font-medium">No recent activity found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-gray-400 text-xs font-bold uppercase tracking-wide border-b border-gray-100">
                  <th className="p-4 px-6">#</th>
                  <th className="p-4">Employee</th>
                  <th className="p-4">Subject</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Time</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((act, i) => {
                  const statusStyle =
                    act.status === "Present"
                      ? "bg-green-100 text-green-700"
                      : act.status === "Late"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-gray-100 text-gray-600";
                  const StatusIcon =
                    act.status === "Present"
                      ? CheckCircle
                      : act.status === "Late"
                      ? Clock
                      : XCircle;
                  return (
                    <tr
                      key={i}
                      className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors text-sm"
                    >
                      <td className="p-4 px-6 text-gray-400 font-medium">{i + 1}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-gray-100 font-bold text-gray-600 flex items-center justify-center text-sm flex-shrink-0">
                            {act.userName ? act.userName.charAt(0).toUpperCase() : "?"}
                          </div>
                          <span className="font-semibold text-gray-800">{act.userName}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-500">{act.subjectName}</td>
                      <td className="p-4 text-gray-500 tabular-nums">{formatToDDMMYY(act.date)}</td>
                      <td className="p-4 text-gray-400 tabular-nums text-xs">{act.time}</td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyle}`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {act.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDashboardHome;
