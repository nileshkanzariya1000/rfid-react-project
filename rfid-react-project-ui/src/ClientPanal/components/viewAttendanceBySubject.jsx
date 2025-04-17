import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPunchRecordBySubject } from '../service/api';
import { Bar } from 'react-chartjs-2'; // Import Bar chart from react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
    console.log("Error occurred: ", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong!</h1>;
    }
    return this.props.children;
  }
}

const ViewAttendanceBySubject = () => {
  const { ct_id } = useParams();
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [expandedUserIds, setExpandedUserIds] = useState([]); // Track expanded users
  const [searchQuery, setSearchQuery] = useState(''); // Search query
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const recordsPerPage = 5; // Number of records per page

  // Fetch attendance data
  const fetchAttendanceData = async () => {
    if (!fromDate || !toDate) {
      setError('Please select both from and to dates.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await getPunchRecordBySubject(ct_id, fromDate, toDate);
      if (data.success) {
        setAttendanceData(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetData = () => {
    fetchAttendanceData();
  };

  // Group attendance data by user
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

  // Paginate the data
  const groupedAttendanceData = groupDataByUser();
  const totalPages = Math.ceil(Object.keys(groupedAttendanceData).length / recordsPerPage);
  const startIdx = (currentPage - 1) * recordsPerPage;
  const endIdx = startIdx + recordsPerPage;
  const paginatedData = Object.keys(groupedAttendanceData)
    .slice(startIdx, endIdx)
    .reduce((obj, userId) => {
      obj[userId] = groupedAttendanceData[userId];
      return obj;
    }, {});

  // Filter by search query
  const filteredAttendanceData = Object.keys(paginatedData)
    .filter(userId => {
      const user = paginatedData[userId];
      const searchText = searchQuery.toLowerCase();
      return (
        userId.toLowerCase().includes(searchText) ||
        user.name.toLowerCase().includes(searchText) ||
        user.designation.toLowerCase().includes(searchText)
      );
    })
    .reduce((obj, userId) => {
      obj[userId] = paginatedData[userId];
      return obj;
    }, {});

  // Toggle expanded rows for detailed punches view
  const toggleExpanded = (userId) => {
    setExpandedUserIds(prev =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  // Generate data for the bar chart
  const generateChartData = () => {
    const groupedData = groupDataByUser();
    const labels = Object.keys(groupedData);
    const punches = labels.map(userId => groupedData[userId].punches.length);

    return {
      labels: labels,
      datasets: [
        {
          label: 'Number of Punches',
          data: punches,
          backgroundColor: '#4B8B3B',
          borderColor: '#2F6A2D',
          borderWidth: 1
        }
      ]
    };
  };
  const downloadCSV = () => {
    if (!attendanceData || attendanceData.length === 0) {
      alert("No attendance data to export.");
      return;
    }
  
    // Define CSV headers
    const headers = ["User ID", "Name", "Designation", "Timestamp"];
  
    // Format data
    const rows = attendanceData.map(record => [
      record.user_id,
      record.name,
      record.designation,
      new Date(record.timestamp).toLocaleString()
    ]);
  
    const csvContent = [headers, ...rows]
      .map(row => row.map(field => `"${field}"`).join(","))
      .join("\n");
  
    // Create a blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Attendance_${ct_id}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-semibold text-center mb-6">Attendance for CT ID: {ct_id}</h1>

      {/* Date Range Selection */}
      <div className="mb-6 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex items-center">
          <label htmlFor="fromDate" className="mr-2 font-medium">From Date:</label>
          <input
            type="date"
            id="fromDate"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="p-2 border rounded-md"
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="toDate" className="mr-2 font-medium">To Date:</label>
          <input
            type="date"
            id="toDate"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="p-2 border rounded-md"
          />
        </div>
        <button
          onClick={handleGetData}
          className="mt-4 md:mt-0 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Get Data
        </button>
      </div>
      {attendanceData.length > 0 && (
  <div className="mt-4 flex justify-center">
    <button
      onClick={downloadCSV}
      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
    >
      Download CSV
    </button>
  </div>
)}

      {/* Search */}
      <div className="mb-4 mt-4">
        <input
          type="text"
          placeholder="Search by Name, ID, or Designation"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-md w-full"
        />
      </div>

      {/* Error and Loading States */}
      {loading && <div className="text-center text-gray-700">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}

      {/* Attendance Table */}
      {Object.keys(filteredAttendanceData).length === 0 ? (
        <p className="text-center text-gray-500">No attendance data found.</p>
      ) : (
        <div className="overflow-x-auto">
          <div className="space-y-4">
            {Object.keys(filteredAttendanceData).map((userId) => {
              const user = filteredAttendanceData[userId];
              const isExpanded = expandedUserIds.includes(userId);

              return (
                <div key={userId} className="p-4 bg-white shadow-md rounded-md">
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleExpanded(userId)}>
                    <h2 className="text-lg font-semibold">
                      {userId} | {user.name} | {user.designation}
                    </h2>
                    <span className="text-sm text-gray-600">
                      {user.punches.length} Punches | Latest Punch: {new Date(user.punches[0].timestamp).toLocaleString()}
                    </span>
                  </div>

                  {/* Toggle to show punches */}
                  {isExpanded && (
                    <div className="mt-4">
                      <table className="min-w-full table-auto">
                        <thead>
                          <tr>
                            <th className="border px-4 py-2">Date</th>
                            <th className="border px-4 py-2">Time</th>
                          </tr>
                        </thead>
                        <tbody>
  {Object.entries(
    user.punches.reduce((acc, record) => {
      const dateKey = new Date(record.timestamp).toLocaleDateString();
      const timeValue = new Date(record.timestamp).toLocaleTimeString();

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(timeValue);
      return acc;
    }, {})
  ).map(([date, times], idx) => (
    <tr key={`${userId}-${idx}`} className="border-t even:bg-gray-200 odd:bg-white hover:bg-gray-300">
      <td className="border px-4 py-2 text-center">{date}</td>
      <td className="border px-4 py-2 text-center">{times.join(', ')}</td>
    </tr>
  ))}
</tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Previous
        </button>
        <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Next
        </button>
      </div>

      {/* Graphical Analysis */}
      {attendanceData.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Attendance Analysis</h2>
          <Bar
            data={generateChartData()}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Attendance Analysis'
                },
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => {
                      return `${tooltipItem.label}: ${tooltipItem.raw} Punches`;
                    }
                  }
                }
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'User ID'
                  }
                },
                y: {
                  title: {
                    display: true,
                    text: 'Number of Punches'
                  }
                }
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

// Wrap ViewAttendanceBySubject with ErrorBoundary
const ViewAttendanceWithBoundary = () => (
  <ErrorBoundary>
    <ViewAttendanceBySubject />
  </ErrorBoundary>
);

export default ViewAttendanceWithBoundary;
