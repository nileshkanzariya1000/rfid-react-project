import React, { useState } from 'react';
import { register } from '../service/api'; 
const ClientRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    // Clear previous error or success messages
    setError('');
    setSuccessMessage('');

    // Basic validation
    if (!name || !email || !password || !confirmPassword || !mobile) {
      setError('Please fill out all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const data = await register(name, email, password, mobile);  // Assuming register API accepts these parameters

      if (data.success) {
        setSuccessMessage(data.message || 'Registration successful');
        console.log('Registration successful:', data);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side: Registration form */}
      <div className="w-1/2 flex justify-center items-center bg-white p-8">
        <div className="max-w-md w-full">
          {/* Welcome and secondary heading */}
          <div className="text-center mt-4">
            <h3 className="text-2xl font-semibold mb-4">Wellcome To Client Register👋</h3>
            <p className="text-sm text-gray-500">Join us today! It’s quick and easy</p>
          </div>

          {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile Number:</label>
              <input
                type="text"
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
            >
              Register
            </button>
          </form>

          {/* Divider and Login link */}
          <div className="my-4 text-center">
            <hr className="border-t border-gray-300" />
            <p className="text-sm mt-4">Already have an account? <a href="/clientlogin" className="text-blue-600">Login</a></p>
          </div>
        </div>
      </div>

      {/* Right side: Image */}
      <div className="w-1/2 bg-gray-100 flex justify-center items-center">
        <img src="../../public/login_img.png" alt="Register Illustration" className="object-cover w-full h-full" />
      </div>
    </div>
  );
};

export default ClientRegister;
