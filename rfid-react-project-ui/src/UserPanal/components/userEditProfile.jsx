import React, { useState, useEffect } from "react";
import { updateUser } from "../service/api"; // Assuming userUpdate API is imported from api.js
import Cookies from "js-cookie";

const UserEditProfile = () => {
  // Initialize state variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState(""); // State for mobile number
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
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

  // Handle form submission
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    // Clear previous error or success messages
    setError("");
    setSuccessMessage("");

    // Simple validation
    if (!name || !email || !mobile || !agreeTerms) {
      setError("Please fill out all fields and agree to the terms & conditions.");
      return;
    }

    // Mobile validation (example for phone format, adjust based on needs)
    if (!/^\d{10}$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
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
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

        {/* Error and Success Messages */}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

        <form onSubmit={handleUpdateProfile}>
          <label className="block mb-2">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full p-2 border rounded mb-4"
            value={name}  // Bind state to input field
            onChange={(e) => setName(e.target.value)}
          />

          <label className="block mb-2">Email Address*</label>
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full p-2 border rounded mb-4"
            value={email}  // Bind state to input field
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="block mb-2">Mobile Number*</label>
          <input
            type="tel"
            placeholder="Enter your mobile number"
            className="w-full p-2 border rounded mb-4"
            value={mobile}  // Bind state to input field
            onChange={(e) => setMobile(e.target.value)}
          />

          {/* Checkbox for agreeing to terms */}
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              className="mr-2"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
            <span>I agree to terms & conditions</span>
          </div>

          {/* Update Profile Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserEditProfile;
