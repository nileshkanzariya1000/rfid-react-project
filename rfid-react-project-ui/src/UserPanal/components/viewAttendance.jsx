import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getPunchRecordByUser } from "../service/api";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from "chart.js";
import { 
    CalendarIcon, 
    ClockIcon, 
    CheckCircleIcon, 
    XCircleIcon,
    ArrowDownTrayIcon,
    ChartBarIcon,
    ArrowLeftIcon
} from "@heroicons/react/24/outline";

// Register chart.js components
ChartJS.register(
    CategoryScale, 
    LinearScale, 
    BarElement, 
    Title, 
    Tooltip, 
    Legend,
    ArcElement,
    PointElement,
    LineElement
);

const ViewAttendance = () => {
    const { subjectId, subjectName } = useParams();
    const navigate = useNavigate();
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const [fromDate, setFromDate] = useState(firstDayOfMonth.toISOString().split("T")[0]);
    const [toDate, setToDate] = useState("");
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchAttendance = useCallback(async () => {
        if (!fromDate || !toDate) {
            setError("Please select both dates.");
            return;
        }
        setLoading(true);
        setError("");

        try {
            const response = await getPunchRecordByUser(subjectId, fromDate, toDate);
            if (response.success) {
                setAttendanceRecords(response.data);
            } else {
                setError("Failed to fetch attendance data.");
            }
        } catch (err) {
            setError(err.message);
        }

        setLoading(false);
    }, [fromDate, toDate, subjectId]);

    useEffect(() => {
        if (toDate) {
            fetchAttendance();
        }
    }, [toDate, fetchAttendance]);

    const tileClassName = ({ date }) => {
        const dateString = date.toLocaleDateString("en-CA");
        const hasRecord = attendanceRecords.some(record =>
            new Date(record.timestamp).toLocaleDateString("en-CA") === dateString
        );
        return hasRecord ? "text-green-600 font-bold" : "text-red-600 font-bold";
    };

    const handleDateClick = (date) => {
        const dateString = date.toLocaleDateString("en-CA");
        setSelectedDate(dateString);
    };

    // Bar Chart Data
    const totalDays = toDate ? Math.round((new Date(toDate) - new Date(fromDate)) / (1000 * 60 * 60 * 24)) + 1 : 0;
    const presentCount = attendanceRecords.length;
    const absentCount = totalDays - presentCount;

    // Calculate attendance percentage
    const attendancePercentage = totalDays > 0 ? ((presentCount / totalDays) * 100).toFixed(1) : 0;

    // Prepare data for daily attendance trend (line chart)
    const getDailyAttendanceData = () => {
        if (!attendanceRecords.length || !toDate) return { labels: [], data: [] };
        
        const dateMap = {};
        const startDate = new Date(fromDate);
        const endDate = new Date(toDate);
        
        // Initialize all dates with 0
        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            const dateStr = d.toLocaleDateString("en-CA");
            dateMap[dateStr] = 0;
        }
        
        // Count attendance per day
        attendanceRecords.forEach(record => {
            const dateStr = new Date(record.timestamp).toLocaleDateString("en-CA");
            if (dateStr in dateMap) {
                dateMap[dateStr]++;
            }
        });
        
        
        const labels = Object.keys(dateMap).sort();
        const data = labels.map(label => dateMap[label]);
        
        return { labels, data };
    };

    const dailyData = getDailyAttendanceData();

    // Bar Chart Data
    const barChartData = {
        labels: ["Present", "Absent"],
        datasets: [
            {
                label: "Attendance Count",
                data: [presentCount, absentCount],
                backgroundColor: ["#10B981", "#EF4444"],
                borderColor: ["#059669", "#DC2626"],
                borderWidth: 2,
                borderRadius: 8,
            },
        ],
    };

    const barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                padding: 12,
                titleFont: { size: 14, weight: "bold" },
                bodyFont: { size: 13 },
                cornerRadius: 8,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    font: { size: 12 },
                },
                grid: {
                    color: "rgba(0, 0, 0, 0.05)",
                },
            },
            x: {
                ticks: {
                    font: { size: 12, weight: "500" },
                },
                grid: {
                    display: false,
                },
            },
        },
    };

    // Pie Chart Data
    const pieChartData = {
        labels: ["Present", "Absent"],
        datasets: [
            {
                data: [presentCount, absentCount],
                backgroundColor: ["#10B981", "#EF4444"],
                borderColor: ["#FFFFFF", "#FFFFFF"],
                borderWidth: 3,
            },
        ],
    };

    const pieChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    padding: 15,
                    font: { size: 13, weight: "500" },
                    usePointStyle: true,
                },
            },
            tooltip: {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                padding: 12,
                titleFont: { size: 14, weight: "bold" },
                bodyFont: { size: 13 },
                cornerRadius: 8,
            },
        },
    };

    // Line Chart Data for Daily Trends
    const lineChartData = {
        labels: dailyData.labels.map(date => {
            const d = new Date(date);
            return `${d.getDate()}/${d.getMonth() + 1}`;
        }),
        datasets: [
            {
                label: "Daily Attendance",
                data: dailyData.data,
                borderColor: "#3B82F6",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: "#3B82F6",
                pointBorderColor: "#FFFFFF",
                pointBorderWidth: 2,
            },
        ],
    };

    const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                padding: 12,
                titleFont: { size: 14, weight: "bold" },
                bodyFont: { size: 13 },
                cornerRadius: 8,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    font: { size: 12 },
                },
                grid: {
                    color: "rgba(0, 0, 0, 0.05)",
                },
            },
            x: {
                ticks: {
                    font: { size: 11 },
                    maxRotation: 45,
                    minRotation: 45,
                },
                grid: {
                    display: false,
                },
            },
        },
    };
    const downloadCSV = () => {
        if (attendanceRecords.length === 0) {
            alert("No attendance records to download.");
            return;
        }
    
        const csvHeader = "Date,Time\n";
        const csvRows = attendanceRecords.map(record => {
            const dateObj = new Date(record.timestamp);
            const date = dateObj.toLocaleDateString("en-CA");
            const time = dateObj.toLocaleTimeString();
            return `${date},${time}`;
        });
    
        const csvContent = csvHeader + csvRows.join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
    
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `attendance_${subjectName}_${fromDate}_to_${toDate}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-6 lg:p-8">
            {/* Back Button */}
            <div className="mb-4">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center justify-center w-10 h-10 bg-white hover:bg-gray-100 text-gray-700 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                    title="Back"
                >
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
            </div>

            {/* Header Section */}
            <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                    Attendance Dashboard
                </h1>
                <p className="text-gray-600 text-lg">
                    {subjectName} <span className="text-gray-400">({subjectId})</span>
                </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm font-medium mb-1">Total Days</p>
                            <p className="text-3xl font-bold text-gray-800">{totalDays}</p>
                        </div>
                        <div className="bg-green-100 p-3 rounded-full">
                            <CalendarIcon className="w-8 h-8 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm font-medium mb-1">Present</p>
                            <p className="text-3xl font-bold text-gray-800">{presentCount}</p>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-full">
                            <CheckCircleIcon className="w-8 h-8 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm font-medium mb-1">Absent</p>
                            <p className="text-3xl font-bold text-gray-800">{absentCount}</p>
                        </div>
                        <div className="bg-red-100 p-3 rounded-full">
                            <XCircleIcon className="w-8 h-8 text-red-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm font-medium mb-1">Attendance %</p>
                            <p className="text-3xl font-bold text-gray-800">{attendancePercentage}%</p>
                        </div>
                        <div className="bg-purple-100 p-3 rounded-full">
                            <ChartBarIcon className="w-8 h-8 text-purple-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Date Selection and Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <div className="flex flex-col md:flex-row md:items-end gap-4 mb-4">
                    <div className="flex-1">
                        <label className="block text-gray-700 font-semibold mb-2 text-sm">
                            From Date
                        </label>
                        <input 
                            type="date" 
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-sm" 
                            value={fromDate} 
                            onChange={(e) => setFromDate(e.target.value)}
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-gray-700 font-semibold mb-2 text-sm">
                            To Date
                        </label>
                        <input 
                            type="date" 
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-sm" 
                            value={toDate} 
                            onChange={(e) => setToDate(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={downloadCSV}
                        disabled={attendanceRecords.length === 0}
                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm"
                    >
                        <ArrowDownTrayIcon className="w-5 h-5" />
                        Download CSV
                    </button>
                </div>

                {loading && (
                    <div className="flex items-center gap-2 text-blue-600">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                        <p className="font-medium">Loading attendance data...</p>
                    </div>
                )}
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                        <p className="text-red-700 font-medium">{error}</p>
                    </div>
                )}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Bar Chart */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <ChartBarIcon className="w-6 h-6 text-blue-600" />
                        Attendance Overview
                    </h2>
                    <div className="h-64">
                        <Bar data={barChartData} options={barChartOptions} />
                    </div>
                </div>

                {/* Pie Chart */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <ChartBarIcon className="w-6 h-6 text-purple-600" />
                        Distribution
                    </h2>
                    <div className="h-64">
                        <Pie data={pieChartData} options={pieChartOptions} />
                    </div>
                </div>
            </div>

            {/* Daily Trend Chart */}
            {dailyData.labels.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <ChartBarIcon className="w-6 h-6 text-indigo-600" />
                        Daily Attendance Trend
                    </h2>
                    <div className="h-80">
                        <Line data={lineChartData} options={lineChartOptions} />
                    </div>
                </div>
            )}

            {/* Calendar and Details Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Calendar */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <CalendarIcon className="w-6 h-6 text-green-600" />
                        Calendar View
                    </h2>
                    <div className="calendar-container">
                        <style>{`
                            .react-calendar {
                                width: 100%;
                                border: none;
                                font-family: inherit;
                            }
                            .react-calendar__tile {
                                padding: 0.75em 0.5em;
                                border-radius: 8px;
                                margin: 2px;
                                transition: all 0.2s;
                            }
                            .react-calendar__tile:hover {
                                background-color: #E0E7FF !important;
                                transform: scale(1.05);
                            }
                            .react-calendar__tile--active {
                                background: #3B82F6 !important;
                                color: white !important;
                            }
                            .react-calendar__navigation button {
                                font-size: 1em;
                                padding: 0.75em;
                                border-radius: 8px;
                            }
                            .react-calendar__navigation button:hover {
                                background-color: #F3F4F6;
                            }
                        `}</style>
                        <Calendar 
                            tileClassName={tileClassName} 
                            onClickDay={handleDateClick}
                            className="rounded-lg"
                        />
                    </div>
                </div>

                {/* Selected Date Details */}
                {selectedDate && (
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <ClockIcon className="w-6 h-6 text-blue-600" />
                            Attendance Details - {selectedDate}
                        </h2>
                        <div className="max-h-96 overflow-y-auto">
                            {attendanceRecords
                                .filter(record => new Date(record.timestamp).toLocaleDateString("en-CA") === selectedDate)
                                .length > 0 ? (
                                <div className="space-y-3">
                                    {attendanceRecords
                                        .filter(record => new Date(record.timestamp).toLocaleDateString("en-CA") === selectedDate)
                                        .map((record, index) => (
                                            <div 
                                                key={record.timestamp} 
                                                className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border-l-4 border-blue-500 hover:shadow-md transition-shadow"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                                                        {index + 1}
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-800 font-semibold">
                                                            {new Date(record.timestamp).toLocaleTimeString('en-US', { 
                                                                hour: '2-digit', 
                                                                minute: '2-digit',
                                                                second: '2-digit',
                                                                hour12: true 
                                                            })}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <XCircleIcon className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                                    <p className="text-gray-500 font-medium">No attendance records for this date</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewAttendance;
