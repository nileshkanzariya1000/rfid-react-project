import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../service/api';
import { 
    UserIcon, 
    EnvelopeIcon, 
    LockClosedIcon,
    PhoneIcon,
    EyeIcon,
    EyeSlashIcon,
    CheckCircleIcon,
    XCircleIcon,
    UserPlusIcon,
    ArrowRightIcon,
    ArrowLeftIcon
} from '@heroicons/react/24/outline'; 

const ClientRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // Email validation
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setError('');
    setSuccessMessage('');
    setLoading(true);

    // Basic validation
    if (!name || !email || !password || !confirmPassword || !mobile) {
      setError('Please fill out all fields');
      setLoading(false);
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      setError('Please enter a valid 10-digit mobile number');
      setLoading(false);
      return;
    }

    try {
      const data = await register(name, email, password, mobile);

      if (data.success) {
        setSuccessMessage(data.message || 'Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/ClientLogin');
        }, 2000);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Left side: Registration form */}
      <div className="w-full lg:w-1/2 flex justify-center items-center bg-white p-6 md:p-8 lg:p-12 overflow-y-auto relative">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 flex items-center justify-center w-10 h-10 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg z-10"
          title="Back to Home"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>

        <div className="max-w-md w-full py-4">
          {/* Header Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-50 rounded-3xl mb-6 shadow-sm">
              <UserPlusIcon className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">Client Registration</h3>
            <p className="text-sm text-gray-500 font-medium">Join our network of professional clients</p>
          </div>

          {/* Feedback Messages */}
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-xl flex items-start gap-3 animate-in fade-in duration-300">
              <XCircleIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-800 font-bold text-sm">Error</p>
                <p className="text-red-600 text-xs font-medium">{error}</p>
              </div>
            </div>
          )}

          {successMessage && (
            <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-xl flex items-start gap-3 animate-in fade-in duration-300">
              <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-green-800 font-bold text-sm">Success!</p>
                <p className="text-green-600 text-xs font-medium">{successMessage}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            {/* Full Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                <div className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4 text-gray-400" />
                  Full Name
                </div>
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-green-500 focus:bg-white focus:outline-none transition-all text-sm font-medium"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                <div className="flex items-center gap-2">
                  <EnvelopeIcon className="w-4 h-4 text-gray-400" />
                  Email Address
                </div>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-green-500 focus:bg-white focus:outline-none transition-all text-sm font-medium"
                required
              />
            </div>

            {/* Password Field */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                  <div className="flex items-center gap-2">
                    <LockClosedIcon className="w-4 h-4 text-gray-400" />
                    Password
                  </div>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create password"
                    className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-green-500 focus:bg-white focus:outline-none transition-all text-xs font-medium"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600"
                  >
                    {showPassword ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                  <div className="flex items-center gap-2">
                    <LockClosedIcon className="w-4 h-4 text-gray-400" />
                    Confirm
                  </div>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-green-500 focus:bg-white focus:outline-none transition-all text-xs font-medium"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600"
                  >
                    {showConfirmPassword ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Number Field */}
            <div>
              <label htmlFor="mobile" className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                <div className="flex items-center gap-2">
                  <PhoneIcon className="w-4 h-4 text-gray-400" />
                  Mobile Number
                </div>
              </label>
              <input
                type="tel"
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter 10-digit number"
                maxLength={10}
                className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-green-500 focus:bg-white focus:outline-none transition-all text-sm font-medium"
                required
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-white py-4 rounded-2xl font-bold text-base hover:bg-green-600 transition-all duration-300 shadow-xl hover:shadow-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Client Account</span>
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer Section */}
          <div className="mt-8 pt-6 border-t border-gray-100 italic">
            <p className="text-center text-sm text-gray-500 italic">
              Already have an account?{' '}
              <a href="/ClientLogin" className="text-green-600 font-bold hover:text-green-700 transition-colors italic">
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Right side: Image component */}
      <div className="hidden lg:flex w-1/2 bg-gray-50 justify-center items-center p-12 overflow-hidden relative">
        <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-green-100 rounded-full blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-60 h-60 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        
        <div className="relative z-10">
          <img 
            src="/login_img.png" 
            alt="Client Registration Illustration" 
            className="rounded-2xl shadow-2xl object-cover max-w-full h-auto transition-transform duration-500 hover:scale-105" 
          />
        </div>
      </div>
    </div>
  );
};

export default ClientRegister;
