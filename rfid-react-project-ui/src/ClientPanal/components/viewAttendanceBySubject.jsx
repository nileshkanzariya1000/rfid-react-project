import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPunchRecordBySubject } from '../service/api';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { 
  Calendar, Download, Search, ChevronDown, ChevronRight, 
  User, Clock, Activity, AlertCircle, FileSpreadsheet,
  ChevronLeft
} from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("Error occurred: ", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center bg-[#f4f7fe] p-6">
          <div className="bg-white rounded-2xl p-8 shadow-sm text-center max-w-sm">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">Something went wrong!</h3>
            <p className="text-gray-500 text-sm">Failed to render attendance component.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const ViewAttendanceBySubject = () => {
  const { ct_id } = useParams();
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Date logic - default to last 7 days
  const today = new Date();
  const pastWeek = new Date();
  pastWeek.setDate(today.getDate() - 7);
  
  const [fromDate, setFromDate] = useState(pastWeek.toISOString().split('T')[0]);
  const [toDate, setToDate] = useState(today.toISOString().split('T')[0]);
  
  const [expandedUserIds, setExpandedUserIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const fetchAttendanceData = async () => {
    if (!fromDate || !toDate) {
      setError('Please select both from and to dates.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await getPunchRecordBySubject(ct_id, fromDate, toDate);
      if (data.success && data.data) {
        setAttendanceData(data.data);
        setCurrentPage(1); // Reset page on new data
      } else {
        setError(data.message || 'No data found for this period.');
        setAttendanceData([]);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch attendance');
      setAttendanceData([]);
    } finally {
      setLoading(false);
    }
  };

  const groupDataByUser = () => {
    const groupedData = {};
    attendanceData.forEach(record => {
      if (!groupedData[record.user_id]) {
        groupedData[record.user_id] = {
          name: record.name,
          designation: record.designation,
          punches: []
        };
      }
      groupedData[record.user_id].punches.push(record);
    });
    return groupedData;
  };

  const groupedAttendanceData = groupDataByUser();
  
  // Filter by search query
  const filteredUsers = Object.keys(groupedAttendanceData).filter(userId => {
    const user = groupedAttendanceData[userId];
    const searchText = searchQuery.toLowerCase();
    return (
      userId.toLowerCase().includes(searchText) ||
      (user.name && user.name.toLowerCase().includes(searchText)) ||
      (user.designation && user.designation.toLowerCase().includes(searchText))
    );
  });

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / recordsPerPage));
  const startIdx = (currentPage - 1) * recordsPerPage;
  const paginatedUserIds = filteredUsers.slice(startIdx, startIdx + recordsPerPage);

  const toggleExpanded = (userId) => {
    setExpandedUserIds(prev =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  // Helper for DD-MM-YY
  const formatToDDMMYY = (dateString) => {
    if (!dateString) return '—';
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = String(d.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
  };

  // Helper for 12hr time
  const formatTime = (dateString) => {
    if (!dateString) return '—';
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const generateChartData = () => {
    // Sort users by punch count (top 15) for better chart readability
    const sortedUsers = filteredUsers.sort((a, b) => 
      groupedAttendanceData[b].punches.length - groupedAttendanceData[a].punches.length
    ).slice(0, 15);

    return {
      labels: sortedUsers.map(id => groupedAttendanceData[id].name || id),
      datasets: [
        {
          label: 'Total Punches',
          data: sortedUsers.map(id => groupedAttendanceData[id].punches.length),
          backgroundColor: '#00c950',
          borderRadius: 6,
          barPercentage: 0.5,
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: (ctx) => `${ctx.raw} Punches`
        }
      }
    },
    scales: {
      y: { 
        beginAtZero: true, 
        ticks: { stepSize: 1 },
        grid: { color: '#f0f4ff' },
        border: { display: false }
      },
      x: { 
        grid: { display: false },
        border: { display: false }
      }
    }
  };

  const downloadCSV = () => {
    if (!attendanceData || attendanceData.length === 0) return;
    const headers = ["User ID", "Name", "Designation", "Date", "Time"];
    const rows = attendanceData.map(record => [
      record.user_id,
      record.name || '—',
      record.designation || '—',
      formatToDDMMYY(record.timestamp),
      formatTime(record.timestamp)
    ]);
    const csvContent = [headers, ...rows]
      .map(row => row.map(field => `"${field}"`).join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `Attendance_${ct_id}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="font-sans">
      
      {/* ── Header ───────────────────────────────────── */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#1b2559]">Attendance Records</h2>
          <p className="text-gray-400 text-sm mt-0.5 flex items-center gap-1.5">
            Subject ID: <span className="font-bold text-green-600">{ct_id}</span>
          </p>
        </div>
        
        {attendanceData.length > 0 && (
          <button
            onClick={downloadCSV}
            className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-green-500 hover:text-green-600 text-gray-700 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Export CSV
          </button>
        )}
      </div>

      {/* ── Controls Card ────────────────────────────── */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col lg:flex-row items-center gap-4">
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <div className="w-full sm:w-auto relative">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1 px-1">From Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
              </div>
            </div>
            <div className="w-full sm:w-auto mt-2 sm:mt-0 relative">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1 px-1">To Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          <button
            onClick={fetchAttendanceData}
            disabled={loading}
            className="w-full lg:w-auto lg:mt-5 bg-green-600 hover:bg-green-700 disabled:opacity-70 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 flex-shrink-0"
          >
            {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Search className="w-4 h-4" />}
            Fetch Records
          </button>

          <div className="w-full lg:w-auto lg:ml-auto lg:mt-5 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search employee..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full lg:w-64 pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 bg-gray-50"
            />
          </div>
        </div>
      </div>

      {/* ── Error Banner ─────────────────────────────── */}
      {error && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm font-medium">{error}</p>
        </div>
      )}

      {/* ── Main Content Grid ────────────────────────── */}
      {attendanceData.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Chart Section */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-bold text-gray-800">Punch Distribution Overview</h3>
            </div>
            <div className="h-[250px] w-full">
              <Bar data={generateChartData()} options={chartOptions} />
            </div>
          </div>

          {/* Users List Section */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-bold text-gray-800">Detailed Records</h3>
              </div>
              <span className="text-xs font-semibold bg-green-50 text-green-600 px-3 py-1 rounded-full border border-green-100">
                {filteredUsers.length} Users Found
              </span>
            </div>

            {filteredUsers.length === 0 ? (
              <div className="p-10 text-center">
                <User className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No results found for your search.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {paginatedUserIds.map((userId) => {
                  const user = groupedAttendanceData[userId];
                  const isExpanded = expandedUserIds.includes(userId);
                  const latestPunch = new Date(Math.max(...user.punches.map(p => new Date(p.timestamp))));

                  // Group punches by date for this user
                  const punchesByDate = user.punches.reduce((acc, rec) => {
                    const d = formatToDDMMYY(rec.timestamp);
                    if (!acc[d]) acc[d] = [];
                    acc[d].push(formatTime(rec.timestamp));
                    return acc;
                  }, {});

                  return (
                    <div key={userId} className="group transition-colors">
                      {/* Accordion Header */}
                      <div 
                        onClick={() => toggleExpanded(userId)}
                        className={`p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center cursor-pointer transition-colors ${
                          isExpanded ? 'bg-green-50/50' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-4 mb-3 sm:mb-0">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                            isExpanded ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600 group-hover:bg-green-50 group-hover:text-green-600'
                          }`}>
                            {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800 text-sm">{user.name || 'Unknown'}</h4>
                            <p className="text-xs text-gray-400 mt-0.5">
                              ID: {userId} {user.designation && `• ${user.designation}`}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 w-full sm:w-auto pl-14 sm:pl-0">
                          <div className="text-left sm:text-right flex-1 sm:flex-none">
                            <p className="text-xs font-bold text-gray-700">
                              {user.punches.length} {user.punches.length === 1 ? 'Punch' : 'Punches'}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              Latest: {formatToDDMMYY(latestPunch.toISOString())}
                            </p>
                          </div>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-200 ${
                            isExpanded ? 'rotate-180 bg-green-100 text-green-600' : 'bg-gray-50 text-gray-400'
                          }`}>
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        </div>
                      </div>

                      {/* Expanded Content */}
                      {isExpanded && (
                        <div className="p-5 bg-white border-t border-green-50/50">
                          <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                            <table className="w-full text-left text-sm">
                              <thead className="bg-gray-100/50 text-gray-500 text-xs uppercase tracking-wider">
                                <tr>
                                  <th className="px-5 py-3 font-semibold">Date</th>
                                  <th className="px-5 py-3 font-semibold">Punches Recorded</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-100">
                                {Object.entries(punchesByDate).map(([date, times], idx) => (
                                  <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                                    <td className="px-5 py-3 font-medium text-gray-700 tabular-nums flex items-center gap-2">
                                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                      {date}
                                    </td>
                                    <td className="px-5 py-3">
                                      <div className="flex flex-wrap gap-2">
                                        {times.map((t, i) => (
                                          <span key={i} className="inline-flex items-center gap-1 bg-white border border-gray-200 text-gray-600 px-2 py-1 rounded-md text-xs tabular-nums shadow-sm">
                                            <Clock className="w-3 h-3 text-green-500" />
                                            {t}
                                          </span>
                                        ))}
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="p-4 border-t border-gray-50 flex items-center justify-between bg-white">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>
                <div className="flex items-center gap-1 text-sm font-medium text-gray-500">
                  Page <span className="font-bold text-gray-800">{currentPage}</span> of {totalPages}
                </div>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

        </div>
      )}

      {/* ── Empty State ──────────────────────────────── */}
      {!loading && attendanceData.length === 0 && !error && (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="bg-gray-50 p-4 rounded-full mb-4">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-1">Select a Date Range</h3>
          <p className="text-gray-500 text-sm text-center max-w-sm">
            Choose a 'From' and 'To' date and click "Fetch Records" to view and analyze subject attendance data.
          </p>
        </div>
      )}

    </div>
  );
};

export default function ViewAttendanceWithBoundary() {
  return (
    <ErrorBoundary>
      <ViewAttendanceBySubject />
    </ErrorBoundary>
  );
}
