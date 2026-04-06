import React, { useState } from 'react';
import { login } from '../service/api';  // Importing the login function from api.js
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { 
    EnvelopeIcon, 
    LockClosedIcon,
    EyeIcon,
    EyeSlashIcon,
    CheckCircleIcon,
    XCircleIcon,
    UserIcon,
    ArrowRightIcon,
    ArrowLeftIcon
} from '@heroicons/react/24/outline';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);  // State for terms & conditions
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); 
  const handleLogin = async (e) => {
    e.preventDefault();

    // Clear previous error or success messages
    setError('');
    setSuccessMessage('');
    setLoading(true);

    if (!email || !password || !agreeTerms) {
      setError('Please fill out all fields and agree to the terms & conditions');
      setLoading(false);
      return;
    }

    try {
      const data = await login(email, password);  

      if (data.success) {
        setSuccessMessage(data.message || 'Login successful');
        Cookies.set('user_data', JSON.stringify(data), { expires: 1 });
        setTimeout(() => {
          navigate('/userdashboard');
        }, 1000);
      } else {
        setError(data.message || 'Login failed');
      }

    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left side: Login form */}
      <div className="w-full lg:w-1/2 flex justify-center items-center bg-white p-6 md:p-8 lg:p-12 relative">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          title="Back to Home"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>

        <div className="max-w-md w-full">
          {/* Welcome and secondary heading */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <UserIcon className="w-8 h-8 text-gray-700" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Welcome Back</h3>
            <p className="text-sm text-gray-500">Sign in to your account to continue</p>
          </div>
          
          {/* Error and Success Messages */}
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start gap-3">
              <XCircleIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-700 font-semibold text-sm">Error</p>
                <p className="text-red-600 text-xs">{error}</p>
              </div>
            </div>
          )}

          {successMessage && (
            <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg flex items-start gap-3">
              <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-green-700 font-semibold text-sm">Success!</p>
                <p className="text-green-600 text-xs">{successMessage}</p>
              </div>
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <EnvelopeIcon className="w-4 h-4" />
                  Email Address
                </div>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-gray-400 focus:outline-none transition-colors text-sm"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <LockClosedIcon className="w-4 h-4" />
                  Password
                </div>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full p-4 pr-12 border-2 border-gray-200 rounded-lg focus:border-gray-400 focus:outline-none transition-colors text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Checkbox for agreeing to terms */}
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                required
              />
              <label htmlFor="agreeTerms" className="text-sm text-gray-700 cursor-pointer">
                <span className="font-semibold">I agree to the</span>{' '}
                <a href="#" className="text-gray-600 hover:text-gray-800 underline">terms & conditions</a>
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-white py-4 rounded-lg font-semibold text-sm md:text-base hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRightIcon className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Divider and Register link */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">New to our platform?</span>
              </div>
            </div>
            <p className="text-center text-sm mt-4 text-gray-600">
              Don't have an account?{' '}
              <a href="/UserRegister" className="text-gray-800 font-semibold hover:text-gray-600 transition-colors">
                Create an account
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Right side: Image */}
      <div className="hidden lg:flex w-1/2 bg-gray-100 justify-center items-center p-8">
        <div className="w-full h-full flex items-center justify-center">
          <img 
            src="../../public/login_img.png" 
            alt="Login Illustration" 
            className="object-contain max-w-full max-h-full rounded-lg shadow-lg" 
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
