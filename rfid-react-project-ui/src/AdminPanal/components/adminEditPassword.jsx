import React, { useState } from "react";
import Cookies from "js-cookie";
import { updateAdminPassword } from "../service/api";

const AdminEditPassword = () => {
  // State variables for password fields
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
  const [loading, setLoading] = useState(false); // State for button disable

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
      console.log("API Response:", response);

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
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mt-[-50px]">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>

        {/* Error and Success Messages */}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

        <form onSubmit={handleUpdatePassword}>
          <label className="block mb-2">Old Password</label>
          <input
            type="password"
            placeholder="Enter your old password"
            className="w-full p-2 border rounded mb-4"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />

          <label className="block mb-2">New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full p-2 border rounded mb-4"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <label className="block mb-2">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm new password"
            className="w-full p-2 border rounded mb-4"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            type="submit"
            className={`w-full p-2 rounded ${loading ? "bg-gray-400" : "bg-green-500 text-white"}`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminEditPassword;
