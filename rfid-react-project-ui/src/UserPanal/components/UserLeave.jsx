import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { applyLeave, getUserLeaves } from "../service/api";
import { CheckCircleIcon, XCircleIcon, ClockIcon } from "@heroicons/react/24/solid";

const UserLeave = () => {
  const [leaves, setLeaves] = useState([]);
  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
    reason: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const userData = Cookies.get("user_data");
  const { user_id } = userData ? JSON.parse(userData) : {};

  const formatToDDMMYY = (dateString) => {
    if (!dateString) return "—";
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = String(d.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    fetchLeaves();
  }, [user_id]);

  const fetchLeaves = async () => {
    if (!user_id) return;
    setLoading(true);
    try {
      const response = await getUserLeaves(user_id);
      if (response.success) {
        if (response.data && Array.isArray(response.data)) {
          setLeaves(response.data);
        } else if (response.data && response.data.leaves && Array.isArray(response.data.leaves)) {
          setLeaves(response.data.leaves);
        } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
          setLeaves(response.data.data);
        } else {
          console.error("Unexpected leaves data format:", response.data);
          setLeaves([]);
        }
      }
    } catch (err) {
      console.error("Failed to fetch leaves", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitLoading(true);

    if (!formData.start_date || !formData.end_date || !formData.reason) {
      setError("All fields are required");
      setSubmitLoading(false);
      return;
    }

    if (new Date(formData.end_date) < new Date(formData.start_date)) {
        setError("End date cannot be before start date");
        setSubmitLoading(false);
        return;
    }

    try {
      const response = await applyLeave(
        user_id,
        formData.reason,
        formData.start_date,
        formData.end_date
      );
      if (response.success) {
        setSuccess("Leave application submitted successfully!");
        setFormData({ start_date: "", end_date: "", reason: "" });
        fetchLeaves(); // Refresh list
      } else {
        setError(response.message || "Failed to submit request");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setSubmitLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return (
          <span className="flex items-center gap-1 text-green-600 bg-green-100 px-3 py-1 rounded-full text-sm font-medium">
            <CheckCircleIcon className="w-4 h-4" /> Approved
          </span>
        );
      case "Rejected":
        return (
          <span className="flex items-center gap-1 text-red-600 bg-red-100 px-3 py-1 rounded-full text-sm font-medium">
            <XCircleIcon className="w-4 h-4" /> Rejected
          </span>
        );
      default:
        return (
            <span className="flex items-center gap-1 text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full text-sm font-medium">
            <ClockIcon className="w-4 h-4" /> Pending
          </span>
        );
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Leave Application</h1>

      {/* Application Form */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Apply for Leave</h2>
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">{error}</div>}
        {success && <div className="bg-green-50 text-green-600 p-3 rounded-lg mb-4">{success}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                min={formData.start_date || new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows="3"
              placeholder="Please describe the reason for your leave..."
              className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all resize-none"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitLoading}
              className={`px-6 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors focus:ring-4 focus:ring-green-200 ${submitLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {submitLoading ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>

      {/* Request History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-700">My Leave History</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm uppercas">
              <tr>
                <th className="px-6 py-3 font-semibold">Start Date</th>
                <th className="px-6 py-3 font-semibold">End Date</th>
                <th className="px-6 py-3 font-semibold">Reason</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold">Applied On</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">Loading history...</td>
                </tr>
              ) : leaves.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No leave history found.</td>
                </tr>
              ) : (
                leaves.map((leave) => (
                  <tr key={leave.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-800 font-medium">{formatToDDMMYY(leave.start_date)}</td>
                    <td className="px-6 py-4 text-gray-800 font-medium">{formatToDDMMYY(leave.end_date)}</td>
                    <td className="px-6 py-4 text-gray-600 max-w-xs truncate" title={leave.reason}>{leave.reason}</td>
                    <td className="px-6 py-4">{getStatusBadge(leave.status)}</td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{formatToDDMMYY(leave.created_at)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserLeave;
