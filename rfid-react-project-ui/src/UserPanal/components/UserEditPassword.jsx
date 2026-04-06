import React, { useState } from "react";
import { updateUserPassword } from "../service/api"; // Import API function
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { 
    KeyIcon, 
    EyeIcon, 
    EyeSlashIcon,
    LockClosedIcon,
    CheckCircleIcon,
    XCircleIcon,
    ShieldCheckIcon,
    ArrowLeftIcon
} from "@heroicons/react/24/outline";

const UserEditPassword = () => {
  // State variables for password fields
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // Get user_id from cookies
  const storedUserData = Cookies.get("user_data");
  let userId = "";
  if (storedUserData) {
    try {
      userId = JSON.parse(storedUserData).user_id;
    } catch (error) {
      console.error("Error parsing user_data cookie:", error);
    }
  }

  // Password strength checker
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "", color: "" };
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
    const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-gray-500", "bg-green-500"];
    
    return {
      strength: Math.min(strength, 4),
      label: strengthLabels[Math.min(strength, 4)],
      color: strengthColors[Math.min(strength, 4)]
    };
  };

  const passwordStrength = getPasswordStrength(newPassword);

  // Handle Password Update
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);
  
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      setLoading(false);
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      setLoading(false);
      return;
    }
  
    // Ensure userId is valid before proceeding
    if (!userId) {
      setError("User ID is missing. Please log in again.");
      setLoading(false);
      return;
    }
  
    try {
      const response = await updateUserPassword(userId, oldPassword, newPassword);
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
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4 md:p-6 lg:p-8">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
        {/* Back Button */}
        <div className="p-6 md:p-8 pb-0">
          <button
            onClick={() => navigate('/UserDashboard')}
            className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg mb-4"
            title="Back to Dashboard"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Header Section */}
        <div className="bg-gray-50 border-b border-gray-200 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gray-200 p-3 rounded-full">
              <KeyIcon className="w-8 h-8 text-gray-700" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Change Password</h2>
              <p className="text-gray-600 text-sm mt-1">Update your account password securely</p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-6 md:p-8">
          {/* Error and Success Messages */}
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start gap-3 animate-fade-in">
              <XCircleIcon className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-700 font-semibold">Error</p>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            </div>
          )}

          {successMessage && (
            <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg flex items-start gap-3 animate-fade-in">
              <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-green-700 font-semibold">Success!</p>
                <p className="text-green-600 text-sm">{successMessage}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleUpdatePassword} className="space-y-6">
            {/* Old Password Field */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm">
                <div className="flex items-center gap-2">
                  <LockClosedIcon className="w-4 h-4" />
                  Current Password
                </div>
              </label>
              <div className="relative">
                <input
                  type={showOldPassword ? "text" : "password"}
                  placeholder="Enter your current password"
                  className="w-full p-4 pr-12 border-2 border-gray-200 rounded-lg focus:border-gray-400 focus:outline-none transition-colors text-sm"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showOldPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* New Password Field */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm">
                <div className="flex items-center gap-2">
                  <ShieldCheckIcon className="w-4 h-4" />
                  New Password
                </div>
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  className="w-full p-4 pr-12 border-2 border-gray-200 rounded-lg focus:border-gray-400 focus:outline-none transition-colors text-sm"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showNewPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {newPassword && (
                <div className="mt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                        style={{ width: `${((passwordStrength.strength + 1) / 5) * 100}%` }}
                      />
                    </div>
                    <span className={`text-xs font-semibold ${
                      passwordStrength.strength === 0 ? "text-red-500" :
                      passwordStrength.strength === 1 ? "text-orange-500" :
                      passwordStrength.strength === 2 ? "text-yellow-500" :
                      passwordStrength.strength === 3 ? "text-gray-600" :
                      "text-green-500"
                    }`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p className={newPassword.length >= 6 ? "text-green-600" : ""}>
                      {newPassword.length >= 6 ? "✓" : "•"} At least 6 characters
                    </p>
                    <p className={newPassword.length >= 8 ? "text-green-600" : ""}>
                      {newPassword.length >= 8 ? "✓" : "•"} At least 8 characters (recommended)
                    </p>
                    <p className={/[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword) ? "text-green-600" : ""}>
                      {/[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword) ? "✓" : "•"} Mix of uppercase and lowercase
                    </p>
                    <p className={/\d/.test(newPassword) ? "text-green-600" : ""}>
                      {/\d/.test(newPassword) ? "✓" : "•"} Include numbers
                    </p>
                    <p className={/[^a-zA-Z\d]/.test(newPassword) ? "text-green-600" : ""}>
                      {/[^a-zA-Z\d]/.test(newPassword) ? "✓" : "•"} Include special characters
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm">
                <div className="flex items-center gap-2">
                  <LockClosedIcon className="w-4 h-4" />
                  Confirm New Password
                </div>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your new password"
                  className={`w-full p-4 pr-12 border-2 rounded-lg focus:outline-none transition-colors text-sm ${
                    confirmPassword && newPassword !== confirmPassword
                      ? "border-red-500 focus:border-red-500"
                      : confirmPassword && newPassword === confirmPassword
                      ? "border-green-500 focus:border-green-500"
                      : "border-gray-200 focus:border-gray-400"
                  }`}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              {confirmPassword && (
                <div className="mt-2 flex items-center gap-2">
                  {newPassword === confirmPassword ? (
                    <>
                      <CheckCircleIcon className="w-4 h-4 text-green-500" />
                      <span className="text-xs text-green-600 font-medium">Passwords match</span>
                    </>
                  ) : (
                    <>
                      <XCircleIcon className="w-4 h-4 text-red-500" />
                      <span className="text-xs text-red-600 font-medium">Passwords do not match</span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-white py-4 rounded-lg font-semibold text-sm md:text-base hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Updating Password...</span>
                </>
              ) : (
                <>
                  <KeyIcon className="w-5 h-5" />
                  <span>Change Password</span>
                </>
              )}
            </button>
          </form>

          {/* Security Tips */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <ShieldCheckIcon className="w-4 h-4 text-gray-700" />
              Security Tips
            </h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Use a unique password that you don't use elsewhere</li>
              <li>• Don't share your password with anyone</li>
              <li>• Change your password regularly</li>
              <li>• Avoid using personal information in your password</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEditPassword;
