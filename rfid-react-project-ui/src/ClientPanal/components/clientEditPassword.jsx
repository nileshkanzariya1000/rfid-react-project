import React, { useState } from "react";
import Cookies from "js-cookie";
import { updateClientPassword } from "../service/api";
const ClientEditPassword = () => {
  // State variables for password fields
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Get user_id from cookies
  const storedUserData = Cookies.get("client_data");

  let clientId = "";
  if (storedUserData) {
    try {
        clientId = JSON.parse(storedUserData).client_id;
    } catch (error) {
      console.error("Error parsing user_data cookie:", error);
    }
  }

  // Handle Password Update
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
  
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }
  
    // Ensure userId is valid before proceeding
    if (!clientId) {
      setError("User ID is missing. Please log in again.");
      return;
    }
  
    try {
      const response = await updateClientPassword(clientId, oldPassword, newPassword);
      console.log("API Response:", response); // Debugging API response
  
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
      setError("An error occurred while updating the password.");
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
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

          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClientEditPassword;
