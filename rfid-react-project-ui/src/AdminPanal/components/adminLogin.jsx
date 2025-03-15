import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../service/api';
import Cookies from 'js-cookie';

const AdminLogin = () => {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    if (!username || !password || !agreeTerms) {
      setError('Please fill out all fields and agree to the terms & conditions');
      return;
    }
    
    try {
      const data = await login(username, password);
      if (data.success) {
        // Make sure username is included in the stored data
        const dataToStore = {
          ...data,
          username: username // Ensure username is included in the stored data
        };
        
        setSuccessMessage(data.message || 'Login successful');
        Cookies.set('admin_data', JSON.stringify(dataToStore), { expires: 1 });
        console.log('Login successful:', dataToStore);
        
        // Redirect to dashboard after successful login
        setTimeout(() => {
          navigate('/Admindashboard');
        }, 500); // Short delay to show success message
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
            <h3 className="text-2xl font-semibold mb-4">Welcome to Admin</h3>
            <p className="text-sm text-gray-500">We are happy to have you back</p>
          </div>
          
          {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="Username" className="block text-sm font-medium text-gray-700">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
        </div>
      </div>
      
      {/* Right side: Image */}
      <div className="w-1/2 bg-gray-100 flex justify-center items-center">
        <img src="../../public/login_img.png" alt="Login Illustration" className="object-cover w-full h-full" />
      </div>
    </div>
  );
};

export default AdminLogin;