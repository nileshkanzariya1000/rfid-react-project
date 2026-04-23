import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../service/api';
import Cookies from 'js-cookie';
import { 
    EnvelopeIcon, 
    LockClosedIcon,
    EyeIcon,
    EyeSlashIcon,
    CheckCircleIcon,
    XCircleIcon,
    ArrowRightIcon,
    ArrowLeftIcon,
    BriefcaseIcon
} from '@heroicons/react/24/outline';

const ClientLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
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
        Cookies.set('client_data', JSON.stringify(data), { expires: 1 });
        
        setTimeout(() => {
          navigate('/ClientDashboard');
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
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Left side: Login form */}
      <div className="w-full lg:w-1/2 flex justify-center items-center bg-white p-6 md:p-8 lg:p-12 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
        
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-6 left-6 flex items-center justify-center w-10 h-10 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl transition-all duration-200 shadow-sm border border-gray-100"
          title="Back to Home"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>

        <div className="max-w-md w-full">
          {/* Header Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-50 rounded-3xl mb-6 shadow-sm">
              <BriefcaseIcon className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
              Client Portal
            </h2>
            <p className="text-sm text-gray-500 font-medium">
              Manage your services and subjects
            </p>
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

          <form onSubmit={handleLogin} className="space-y-6">
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
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                <div className="flex items-center gap-2">
                  <LockClosedIcon className="w-4 h-4 text-gray-400" />
                  Password
                </div>
              </label>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full p-4 pr-12 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-green-500 focus:bg-white focus:outline-none transition-all text-sm font-medium"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-green-200 transition-colors">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-1 w-5 h-5 text-green-600 border-gray-300 rounded-lg focus:ring-green-500 focus:ring-2 cursor-pointer"
                required
              />
              <label htmlFor="agreeTerms" className="text-xs text-gray-600 cursor-pointer leading-relaxed font-medium">
                I agree to the <span className="text-green-600 font-bold hover:underline cursor-pointer">terms & conditions</span>
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-white py-4 rounded-2xl font-bold text-base hover:bg-green-600 transition-all duration-300 shadow-xl hover:shadow-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer Section */}
          <div className="mt-8 pt-6 border-t border-gray-100 italic">
            <p className="text-center text-sm text-gray-500 italic">
              Don't have an account?{' '}
              <a href="/clientregister" className="text-green-600 font-bold hover:text-green-700 transition-colors italic">
                Register as Client
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Right side: Visual Component */}
      <div className="hidden lg:flex w-1/2 bg-gray-50 justify-center items-center p-12 relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-green-100 rounded-full blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-60 h-60 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
            <img 
              src="/login_img.png" 
              alt="Client Portal Illustration" 
              className="relative rounded-2xl shadow-2xl object-contain max-w-full max-h-full transition-transform duration-500 group-hover:scale-[1.02]" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientLogin;
