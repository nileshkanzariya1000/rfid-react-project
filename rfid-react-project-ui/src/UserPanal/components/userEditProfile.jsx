import React, { useState, useEffect } from "react";
import { updateUser } from "../service/api"; // Assuming userUpdate API is imported from api.js
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { 
    UserIcon, 
    EnvelopeIcon, 
    PhoneIcon,
    CheckCircleIcon,
    XCircleIcon,
    PencilSquareIcon,
    ShieldCheckIcon,
    ArrowLeftIcon
} from "@heroicons/react/24/outline";

const UserEditProfile = () => {
  // Initialize state variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState(""); // State for mobile number
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    user_id: '',
    name: '',
    mobile: '',
    email: '',
  });

  useEffect(() => {
    // Retrieve the 'user_data' cookie and parse it if it exists
    const storedUserData = Cookies.get('user_data');
    
    // Check if storedUserData exists, and parse it from string
    if (storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);  // Set user data in state
        console.log(parsedUserData);
        // Initialize form state with data from cookie
        setName(parsedUserData.user_name); // Initialize name state
        setEmail(parsedUserData.user_email); // Initialize email state
        setMobile(parsedUserData.user_mobile); // Initialize mobile state
      } catch (error) {
        console.error("Error parsing user_data cookie:", error);
      }
    }
  }, []); // Empty dependency array means this runs once on component mount

  // Email validation
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handle form submission
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    // Clear previous error or success messages
    setError("");
    setSuccessMessage("");
    setLoading(true);

    // Simple validation
    if (!name || !email || !mobile || !agreeTerms) {
      setError("Please fill out all fields and agree to the terms & conditions.");
      setLoading(false);
      return;
    }

    // Email validation
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    // Mobile validation (example for phone format, adjust based on needs)
    if (!/^\d{10}$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      setLoading(false);
      return;
    }

    try {
      // Call the updateUser API with the form data
      const data = await updateUser(userData.user_id, name, email, mobile);

      if (data.success) {
        setSuccessMessage(data.message || "Profile updated successfully!");
      } else {
        setError(data.message || "Profile update failed.");
      }
    } catch (err) {
      setError(err.message || "An error occurred while updating the profile.");
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
              <PencilSquareIcon className="w-8 h-8 text-gray-700" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Edit Profile</h2>
              <p className="text-gray-600 text-sm mt-1">Update your personal information</p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-6 md:p-8">
          {/* Error and Success Messages */}
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start gap-3">
              <XCircleIcon className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-700 font-semibold">Error</p>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            </div>
          )}

          {successMessage && (
            <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg flex items-start gap-3">
              <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-green-700 font-semibold">Success!</p>
                <p className="text-green-600 text-sm">{successMessage}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleUpdateProfile} className="space-y-6">
            {/* Full Name Field */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm">
                <div className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4" />
                  Full Name
                </div>
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-gray-400 focus:outline-none transition-colors text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email Address Field */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm">
                <div className="flex items-center gap-2">
                  <EnvelopeIcon className="w-4 h-4" />
                  Email Address <span className="text-red-500">*</span>
                </div>
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                className={`w-full p-4 border-2 rounded-lg focus:outline-none transition-colors text-sm ${
                  email && !isValidEmail(email)
                    ? "border-red-500 focus:border-red-500"
                    : email && isValidEmail(email)
                    ? "border-green-500 focus:border-green-500"
                    : "border-gray-200 focus:border-gray-400"
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {email && !isValidEmail(email) && (
                <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
                  <XCircleIcon className="w-3 h-3" />
                  Please enter a valid email address
                </p>
              )}
              {email && isValidEmail(email) && (
                <p className="mt-2 text-xs text-green-600 flex items-center gap-1">
                  <CheckCircleIcon className="w-3 h-3" />
                  Valid email address
                </p>
              )}
            </div>

            {/* Mobile Number Field */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm">
                <div className="flex items-center gap-2">
                  <PhoneIcon className="w-4 h-4" />
                  Mobile Number <span className="text-red-500">*</span>
                </div>
              </label>
              <input
                type="tel"
                placeholder="Enter your 10-digit mobile number"
                className={`w-full p-4 border-2 rounded-lg focus:outline-none transition-colors text-sm ${
                  mobile && !/^\d{10}$/.test(mobile)
                    ? "border-red-500 focus:border-red-500"
                    : mobile && /^\d{10}$/.test(mobile)
                    ? "border-green-500 focus:border-green-500"
                    : "border-gray-200 focus:border-gray-400"
                }`}
                value={mobile}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ''); // Only allow digits
                  setMobile(value);
                }}
                maxLength={10}
                required
              />
              {mobile && !/^\d{10}$/.test(mobile) && (
                <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
                  <XCircleIcon className="w-3 h-3" />
                  Please enter a valid 10-digit mobile number
                </p>
              )}
              {mobile && /^\d{10}$/.test(mobile) && (
                <p className="mt-2 text-xs text-green-600 flex items-center gap-1">
                  <CheckCircleIcon className="w-3 h-3" />
                  Valid mobile number
                </p>
              )}
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <input
                type="checkbox"
                id="agreeTerms"
                className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                required
              />
              <label htmlFor="agreeTerms" className="text-sm text-gray-700 cursor-pointer">
                <span className="font-semibold">I agree to the terms & conditions</span>
                <span className="text-red-500 ml-1">*</span>
                <p className="text-xs text-gray-500 mt-1 font-normal">
                  By checking this box, you confirm that all information provided is accurate and you agree to our terms of service.
                </p>
              </label>
            </div>

            {/* Update Profile Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-white py-4 rounded-lg font-semibold text-sm md:text-base hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Updating Profile...</span>
                </>
              ) : (
                <>
                  <PencilSquareIcon className="w-5 h-5" />
                  <span>Update Profile</span>
                </>
              )}
            </button>
          </form>

          {/* Info Section */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <ShieldCheckIcon className="w-4 h-4 text-gray-700" />
              Profile Information
            </h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Your profile information is kept secure and private</li>
              <li>• Changes will be reflected immediately after update</li>
              <li>• Make sure all information is accurate before submitting</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEditProfile;
