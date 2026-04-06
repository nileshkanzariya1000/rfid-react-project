import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Activity,
  Clock,
  CheckCircle,
  Calendar,
  ChevronRight,
  Sun,
  AlertCircle,
  XCircle,
  TrendingUp,
  User,
} from "lucide-react";
import { getUserSubjects, getPunchRecordByUser, getUserLeaves } from "../service/api";

const DashboardHome = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const [allPunchRecords, setAllPunchRecords] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState(null);

  // Parse user from cookie
  let userData = {};
  try {
    const cookie = Cookies.get("user_data");
    userData = cookie ? JSON.parse(cookie) : {};
  } catch (e) {}

  const userRole = userData.user_role || "user";
  const userName = userData.user_name || "User";
  const userId = userData.user_id;

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch all dashboard data
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        // 1. Subjects
        const subjectRes = await getUserSubjects();
        const subjectList = subjectRes?.data || [];
        setSubjects(subjectList);

        // 2. Punch records for all subjects — last 30 days
        const today = new Date();
        const past30 = new Date(today);
        past30.setDate(today.getDate() - 30);
        const fromDate = past30.toISOString().split("T")[0];
        const toDate = today.toISOString().split("T")[0];

        const combined = [];
        for (const subject of subjectList) {
          try {
            const punchRes = await getPunchRecordByUser(subject.ct_id, fromDate, toDate);
            if (punchRes?.success && Array.isArray(punchRes?.data)) {
              punchRes.data.forEach((record) => {
                combined.push({ ...record, subject_name: subject.subject_name });
              });
            }
          } catch (_) {
            // No records for this subject — skip
          }
        }

        // Sort newest first
        combined.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setAllPunchRecords(combined);

        // 3. Leaves
        if (userId) {
          const leaveRes = await getUserLeaves(userId);
          if (leaveRes?.success) {
            const arr = Array.isArray(leaveRes.data)
              ? leaveRes.data
              : Array.isArray(leaveRes.data?.data)
              ? leaveRes.data.data
              : [];
            setLeaves(arr);
          }
        }
      } catch (err) {
        setError(err.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // ── Computed stats ──────────────────────────────────────────────
  const totalSubjects = subjects.length;
  const totalPunches = allPunchRecords.length;
  const pendingLeaves = leaves.filter(
    (l) => (l.status || "").toLowerCase() === "pending"
  ).length;
  const approvedLeaves = leaves.filter(
    (l) => (l.status || "").toLowerCase() === "approved"
  ).length;

  const statCards = [
    {
      title: "My Subjects",
      value: totalSubjects,
      desc: "Enrolled subjects",
      icon: BookOpen,
      iconColor: "text-green-600",
      iconBg: "bg-green-50",
      border: "border-green-500",
      gradient: "from-green-50 to-white",
    },
    {
      title: "Attendance (30d)",
      value: totalPunches,
      desc: "Punch records",
      icon: Activity,
      iconColor: "text-indigo-600",
      iconBg: "bg-indigo-50",
      border: "border-indigo-500",
      gradient: "from-indigo-50 to-white",
    },
    {
      title: "Pending Leaves",
      value: pendingLeaves,
      desc: "Awaiting approval",
      icon: Clock,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-50",
      border: "border-amber-500",
      gradient: "from-amber-50 to-white",
    },
    {
      title: "Approved Leaves",
      value: approvedLeaves,
      desc: "Leaves approved",
      icon: CheckCircle,
      iconColor: "text-green-600",
      iconBg: "bg-green-50",
      border: "border-green-500",
      gradient: "from-green-50 to-white",
    },
  ];

  // ── Helpers ─────────────────────────────────────────────────────
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
    return `${day}${suffix} ${date.toLocaleString("default", {
      month: "long",
    })} ${date.getFullYear()}`;
  };

  const formatToDDMMYY = (dateString) => {
    if (!dateString) return "—";
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = String(d.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
  };

  const leaveStatusStyle = (status = "") => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-amber-100 text-amber-700";
    }
  };

  const leaveStatusIcon = (status = "") => {
    switch (status.toLowerCase()) {
      case "approved":
        return <CheckCircle className="w-3 h-3" />;
      case "rejected":
        return <XCircle className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  // ── Loading state ────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f7fe] p-6 lg:p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-6 bg-gray-200 rounded w-52 mb-8"></div>
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

  // ── Error state ──────────────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen bg-[#f4f7fe] p-6 lg:p-8 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-10 shadow-sm text-center max-w-sm">
          <AlertCircle className="w-14 h-14 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-800 mb-2">Failed to load dashboard</h3>
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  // ── Main render ──────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f4f7fe] p-5 lg:p-8 font-sans">

      {/* ── Breadcrumb ───── */}
      <div className="flex items-center text-sm font-semibold text-gray-400 mb-6">
        <User className="w-4 h-4 mr-1.5 text-green-500" />
        <span className="text-green-600 uppercase tracking-wider">{userRole}</span>
        <ChevronRight className="w-4 h-4 mx-1" />
        <span className="text-green-600 font-bold">Dashboard</span>
        <div className="ml-2 w-0.5 h-4 bg-green-500 skew-x-[-15deg]" />
      </div>

      {/* ── Welcome + Clock ───── */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-amber-50 p-3 rounded-xl">
              <Sun className="w-8 h-8 text-amber-400" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-[#1b2559]">
                Welcome back, {userName}! 👋
              </h2>
              <p className="text-gray-400 text-sm mt-0.5">
                Here's your personal attendance overview
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

      {/* ── Stat Cards ───── */}
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

      {/* ── My Subjects + Recent Activity ───── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

        {/* My Subjects */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-green-600" />
              My Subjects
            </h3>
            <span className="text-xs font-semibold bg-green-50 text-green-600 px-2.5 py-1 rounded-full border border-green-100">
              {totalSubjects} total
            </span>
          </div>

          {subjects.length === 0 ? (
            <div className="text-center py-10">
              <BookOpen className="w-12 h-12 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 text-sm font-medium">No subjects enrolled yet</p>
            </div>
          ) : (
            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {subjects.map((subject, i) => (
                <Link
                  key={subject.ct_id}
                  to={`/UserDashboard/subject/${subject.ct_id}/${encodeURIComponent(subject.subject_name)}`}
                >
                  <div className="flex items-center justify-between p-3.5 bg-gray-50 hover:bg-green-50 rounded-xl transition-all group cursor-pointer border border-transparent hover:border-green-200">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 text-green-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {i + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">
                          {subject.subject_name}
                        </p>
                        <p className="text-xs text-gray-400">ID: {subject.ct_id}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-green-500 transition-colors flex-shrink-0" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Recent Attendance */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
              <Activity className="w-4 h-4 text-green-600" />
              Recent Attendance
            </h3>
            <span className="text-xs font-semibold bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full border border-indigo-100">
              Last 30 days
            </span>
          </div>

          {allPunchRecords.length === 0 ? (
            <div className="text-center py-10">
              <Activity className="w-12 h-12 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 text-sm font-medium">
                No attendance records in the last 30 days
              </p>
            </div>
          ) : (
            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {allPunchRecords.slice(0, 8).map((record, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold text-xs flex-shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">
                        {record.subject_name}
                      </p>
                      <p className="text-xs text-gray-400 tabular-nums">
                        {formatToDDMMYY(record.timestamp)}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 font-semibold px-2.5 py-1 rounded-full flex-shrink-0">
                    Present
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Leave Applications ───── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-green-600" />
            My Leave Applications
          </h3>
          <Link to="/UserDashboard/UserLeave">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              Apply Leave
            </button>
          </Link>
        </div>

        {leaves.length === 0 ? (
          <div className="p-10 text-center">
            <Calendar className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 text-sm font-medium">No leave applications found</p>
            <Link to="/UserDashboard/UserLeave">
              <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors">
                Apply for Leave
              </button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-gray-400 text-xs font-bold uppercase tracking-wide border-b border-gray-100">
                  <th className="p-4 px-6">#</th>
                  <th className="p-4">Reason</th>
                  <th className="p-4">Start Date</th>
                  <th className="p-4">End Date</th>
                  <th className="p-4">Applied On</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave, i) => {
                  const status = leave.status || "Pending";
                  return (
                    <tr
                      key={i}
                      className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors text-sm"
                    >
                      <td className="p-4 px-6 text-gray-400 font-medium">{i + 1}</td>
                      <td className="p-4 text-gray-800 font-medium max-w-[180px]">
                        <span className="truncate block" title={leave.reason}>
                          {leave.reason || "—"}
                        </span>
                      </td>
                      <td className="p-4 text-gray-500 tabular-nums">{formatToDDMMYY(leave.start_date)}</td>
                      <td className="p-4 text-gray-500 tabular-nums">{formatToDDMMYY(leave.end_date)}</td>
                      <td className="p-4 text-gray-400 text-xs tabular-nums">
                        {formatToDDMMYY(leave.created_at)}
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${leaveStatusStyle(status)}`}
                        >
                          {leaveStatusIcon(status)}
                          {status}
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

export default DashboardHome;
