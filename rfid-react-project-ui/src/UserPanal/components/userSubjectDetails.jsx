import React, { useState, useEffect } from 'react';
import { getUserSubjectDetails } from '../service/api';  
import { Link, useNavigate } from "react-router-dom";
import { Outlet,useParams } from "react-router-dom";
import { 
  ArrowLeftIcon,
  CalendarIcon,
  IdentificationIcon,
  AcademicCapIcon,
  TagIcon,
  XCircleIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";

const UserSubjectDetail = ({ ct_id }) => {
  const [subjectDetails, setSubjectDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {  subjectName } = useParams();
  const navigate = useNavigate();
 

  useEffect(() => {
    const fetchSubjectDetails = async () => {
      try {
        const data = await getUserSubjectDetails(ct_id); // Fetch subject details based on ct_id
        setSubjectDetails(data.data[0]); // Assuming the API returns an array inside data
      } catch (error) {
        setError(error.message); // Set the error message if something goes wrong
      } finally {
        setLoading(false); // Stop loading once the request is complete
      }
    };

    fetchSubjectDetails();
  }, [ct_id]); // Re-fetch data when ct_id changes

  
 

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            <p className="text-gray-600 font-medium">Loading subject details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="mb-4">
            <button
              onClick={() => navigate('/UserDashboard')}
              className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              title="Back to Dashboard"
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start gap-3">
            <XCircleIcon className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-700 font-semibold">Error</p>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!subjectDetails) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="mb-4">
            <button
              onClick={() => navigate('/UserDashboard')}
              className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              title="Back to Dashboard"
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="text-center py-12">
            <XCircleIcon className="w-16 h-16 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No subject details available</p>
          </div>
        </div>
      </div>
    );
  }

 
 

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/UserDashboard')}
            className="flex items-center justify-center w-10 h-10 bg-white hover:bg-gray-100 text-gray-700 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
            title="Back to Dashboard"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {subjectName || "Subject Details"}
              </h1>
              <p className="text-gray-600">View and manage your subject information</p>
            </div>
            <Link to={`ViewAttendanceForUser/${encodeURIComponent(ct_id)}`}>
              <button className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold">
                <CalendarIcon className="w-5 h-5" />
                View Attendance
              </button>
            </Link>
          </div>
        </div>

        {/* Subject Details Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Subject ID Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <IdentificationIcon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Subject ID</h3>
            </div>
            <p className="text-2xl font-bold text-gray-800">{ct_id}</p>
          </div>

          {/* Subject Name Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <AcademicCapIcon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Subject Name</h3>
            </div>
            <p className="text-xl font-semibold text-gray-800">{subjectName || "N/A"}</p>
          </div>

          {/* Designation Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <TagIcon className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Designation</h3>
            </div>
            <p className="text-xl font-semibold text-gray-800">
              {subjectDetails.designation || "N/A"}
            </p>
          </div>

          {/* RFID Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <TagIcon className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">RFID Tag</h3>
            </div>
            <p className="text-xl font-semibold text-gray-800 font-mono">
              {subjectDetails.rfid || "N/A"}
            </p>
          </div>
        </div>

        {/* Additional Information Card */}
        <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <CheckCircleIcon className="w-6 h-6 text-green-600" />
            Subject Information
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-600 font-medium">Subject ID</span>
              <span className="text-gray-800 font-semibold">{ct_id}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-600 font-medium">Subject Name</span>
              <span className="text-gray-800 font-semibold">{subjectName || "N/A"}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-600 font-medium">Designation</span>
              <span className="text-gray-800 font-semibold">
                {subjectDetails.designation || "N/A"}
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-600 font-medium">RFID Tag</span>
              <span className="text-gray-800 font-semibold font-mono">
                {subjectDetails.rfid || "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSubjectDetail;
