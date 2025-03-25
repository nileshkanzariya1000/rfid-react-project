import React, { useState } from 'react';
import { login } from '../service/api';  // Importing the login function from api.js
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);  // State for terms & conditions
  const navigate = useNavigate(); 
  const handleLogin = async (e) => {
    e.preventDefault();

    // Clear previous error or success messages
    setError('');
    setSuccessMessage('');

    if (!email || !password || !agreeTerms) {
      setError('Please fill out all fields and agree to the terms & conditions');
      return;
    }

    try {
      const data = await login(email, password);  

      if (data.success) {
        setSuccessMessage(data.message || 'Login successful');
        Cookies.set('user_data', JSON.stringify(data), { expires: 1 });
        navigate('/userdashboard');
      } else {
        setError(data.message || 'Login failed');
      }

    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side: Login form */}
      <div className="w-1/2 flex justify-center items-center bg-white p-8">
      <div className="max-w-md w-full">
    {/* Welcome and secondary heading */}
    <div className="text-center mt-4">
      <h3 className="text-2xl font-semibold mb-4">Welcome to User</h3>
      <p className="text-sm text-gray-500">We are happy to have you back</p>
    </div>
          
          {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}
          
          <form onSubmit={handleLogin}>
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

            {/* Checkbox for agreeing to terms */}
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="agreeTerms" className="text-sm text-gray-600">I agree to the <a href="#" className="text-blue-600">terms & conditions</a></label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
            >
              Login
            </button>
          </form>

         

          {/* Divider and Register link */}
          <div className="my-4 text-center">
            <hr className="border-t border-gray-300" />
            <p className="text-sm mt-4">Don't have an account? <a href="/UserRegister" className="text-blue-600">Register</a></p>
          </div>
        </div>
      </div>

      {/* Right side: Image */}
      <div className="w-1/2 bg-gray-100 flex justify-center items-center">
        <img src="../../public/login_img.png" alt="Login Illustration" className="object-cover w-full h-full" />
      </div>
    </div>
  );
};

export default Login;
