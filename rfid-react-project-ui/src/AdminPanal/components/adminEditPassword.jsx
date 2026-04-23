import React, { useState } from "react";
import Cookies from "js-cookie";
import { updateAdminPassword } from "../service/api";
import { ChevronRight, Key, Shield, CheckCircle, AlertCircle } from "lucide-react";

const AdminEditPassword = () => {
  const adminData = Cookies.get("admin_data");
    
    // If no admin data is found, redirect to login
    if (!adminData) {
      window.location.href = "/";
    }
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Retrieve username from cookies
  const storedUserData = Cookies.get("admin_data");
  let username = "";

  if (storedUserData) {
    try {
      username = JSON.parse(storedUserData).username;
    } catch (error) {
      console.error("Error parsing admin_data cookie:", error);
      setError("Invalid session. Please log in again.");
    }
  }

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (newPassword.length < 4) {
      setError("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }
    if (!username) {
      setError("Username is missing. Please log in again.");
      return;
    }

    try {
      setLoading(true); // Disable button
      const response = await updateAdminPassword(username, oldPassword, newPassword);

      if (response && response.success) {
        setSuccessMessage("Password updated successfully!");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setError(response?.message || "Failed to update password.");
      }
    } catch (err) {
      console.error("Error updating password:", err);
      setError(`An error occurred: ${err.message || "Unknown error"}`);
    } finally {
      setLoading(false); // Re-enable button
    }
  };

  return (
    <div className="p-5 lg:p-8 font-sans text-gray-800 bg-[#f4f7fe] min-h-screen">
      
      {/* ── Breadcrumb ───── */}
      <div className="flex items-center text-sm font-semibold text-gray-400 mb-6">
        <span className="text-green-600 uppercase tracking-wider">Admin</span>
        <ChevronRight className="w-4 h-4 mx-1" />
        <span className="text-green-600 font-bold">Security Settings</span>
        <div className="ml-2 w-0.5 h-4 bg-green-500 skew-x-[-15deg]" />
      </div>

      <div className="max-w-2xl mx-auto mt-8">
        
        {/* Header content */}
        <div className="mb-8 text-center">
          <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 border border-gray-100">
            <Shield className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#1b2559]">Change Password</h2>
          <p className="text-gray-500 mt-2 text-sm">Update your admin credentials securely.</p>
        </div>

        {/* Card wrapper */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">

          {/* Alert Messages */}
          {error && (
            <div className="mb-6 bg-red-50 text-red-600 border border-red-200 p-4 rounded-xl text-sm font-medium flex items-center gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              {error}
            </div>
          )}
          {successMessage && (
            <div className="mb-6 bg-green-50 text-green-700 border border-green-200 p-4 rounded-xl text-sm font-medium flex items-center gap-3">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              {successMessage}
            </div>
          )}

          <form onSubmit={handleUpdatePassword} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 ml-1">Old Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter your current password"
                  className="w-full border border-gray-200 p-3.5 pl-12 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-gray-50 focus:bg-white text-sm"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <Key className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div>
               <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 ml-1">New Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter new password (min. 6 chars)"
                  className="w-full border border-gray-200 p-3.5 pl-12 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-gray-50 focus:bg-white text-sm"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                 <Key className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div>
               <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 ml-1">Confirm New Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Confirm your new password"
                  className="w-full border border-gray-200 p-3.5 pl-12 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-gray-50 focus:bg-white text-sm"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                 <Key className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <button
              type="submit"
              className={`mt-4 w-full p-4 rounded-xl font-bold flex justify-center items-center gap-2 transition-all shadow-md ${
                loading 
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none" 
                  : "bg-green-600 hover:bg-green-700 text-white shadow-green-500/20"
              }`}
              disabled={loading}
            >
              {loading ? (
                <>Updating...</>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Update Password
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminEditPassword;
