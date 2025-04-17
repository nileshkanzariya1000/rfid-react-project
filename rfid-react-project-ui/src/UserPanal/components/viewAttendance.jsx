import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getPunchRecordByUser } from "../service/api";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ViewAttendance = () => {
    const { subjectId, subjectName } = useParams();
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const [fromDate, setFromDate] = useState(firstDayOfMonth.toISOString().split("T")[0]);
    const [toDate, setToDate] = useState("");
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchAttendance = async () => {
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
    };

    useEffect(() => {
        if (toDate) {
            fetchAttendance();
        }
    }, [toDate]);

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

    const chartData = {
        labels: ["Present", "Absent"],
        datasets: [
            {
                label: "Attendance Count",
                data: [presentCount, absentCount],
                backgroundColor: ["#22C55E", "#EF4444"],
                borderColor: ["#16A34A", "#DC2626"],
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { display: true, text: "Attendance Overview" },
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
        <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-100 min-h-screen">
            <div className="bg-white p-4 rounded-lg shadow-lg w-full md:w-2/3">
                <h1 className="text-xl font-semibold mb-3">Attendance for {subjectName} ({subjectId})</h1>
       
         
                <div className="mb-3 flex items-center gap-2">
                    <div>
                        <label className="block text-gray-600 text-sm">From Date:</label>
                        <input 
                            type="date" 
                            className="w-32 p-2 border rounded-md text-sm" 
                            value={fromDate} 
                            onChange={(e) => setFromDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 text-sm">To Date:</label>
                        <input 
                            type="date" 
                            className="w-32 p-2 border rounded-md text-sm" 
                            value={toDate} 
                            onChange={(e) => setToDate(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mb-4">
    <button
        onClick={downloadCSV}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
    >
        Download CSV
    </button>
</div>

                {loading && <p className="text-blue-500 text-sm">Loading...</p>}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                
                <div className="calendar-container">
                    <Calendar tileClassName={tileClassName} onClickDay={handleDateClick} />
                </div>

                {selectedDate && (
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold mb-3">Attendance on {selectedDate}</h2>
                        <table className="w-full border-collapse border border-gray-300 text-sm">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border p-2">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendanceRecords
                                    .filter(record => new Date(record.timestamp).toLocaleDateString("en-CA") === selectedDate)
                                    .map(record => (
                                        <tr key={record.timestamp} className="border">
                                            <td className="border p-2">{new Date(record.timestamp).toLocaleTimeString()}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div className="bg-white p-4 rounded-lg shadow-lg w-full md:w-1/3">
                <h2 className="text-xl font-semibold mb-3">Attendance Overview</h2>
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default ViewAttendance;
