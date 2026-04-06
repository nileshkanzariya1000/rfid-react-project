import React, { useState } from 'react';
import { register } from '../service/api';
import { useNavigate } from 'react-router-dom';
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
const Register = () => {
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

  const passwordStrength = getPasswordStrength(password);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Clear previous error or success messages
    setError('');
    setSuccessMessage('');
    setLoading(true);

    // Basic validation
    if (!name || !email || !password || !confirmPassword || !mobile) {
      setError('Please fill out all fields');
      setLoading(false);
      return;
    }

    // Email validation
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    // Password validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Mobile validation
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
          navigate('/UserLogin');
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
    <div className="flex min-h-screen bg-gray-100">
      {/* Left side: Registration form */}
      <div className="w-full lg:w-1/2 flex justify-center items-center bg-white p-6 md:p-8 lg:p-12 overflow-y-auto relative">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg z-10"
          title="Back to Home"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>

        <div className="max-w-md w-full py-4">
          {/* Welcome and secondary heading */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <UserPlusIcon className="w-8 h-8 text-gray-700" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Create Account</h3>
            <p className="text-sm text-gray-500">Join us today! It's quick and easy</p>
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

          <form onSubmit={handleRegister} className="space-y-5">
            {/* Full Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4" />
                  Full Name
                </div>
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-gray-400 focus:outline-none transition-colors text-sm"
                required
              />
            </div>

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
                className={`w-full p-4 border-2 rounded-lg focus:outline-none transition-colors text-sm ${
                  email && !isValidEmail(email)
                    ? "border-red-500 focus:border-red-500"
                    : email && isValidEmail(email)
                    ? "border-green-500 focus:border-green-500"
                    : "border-gray-200 focus:border-gray-400"
                }`}
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
              
              {/* Password Strength Indicator */}
              {password && (
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
                    <p className={password.length >= 6 ? "text-green-600" : ""}>
                      {password.length >= 6 ? "✓" : "•"} At least 6 characters
                    </p>
                    <p className={password.length >= 8 ? "text-green-600" : ""}>
                      {password.length >= 8 ? "✓" : "•"} At least 8 characters (recommended)
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <LockClosedIcon className="w-4 h-4" />
                  Confirm Password
                </div>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className={`w-full p-4 pr-12 border-2 rounded-lg focus:outline-none transition-colors text-sm ${
                    confirmPassword && password !== confirmPassword
                      ? "border-red-500 focus:border-red-500"
                      : confirmPassword && password === confirmPassword
                      ? "border-green-500 focus:border-green-500"
                      : "border-gray-200 focus:border-gray-400"
                  }`}
                  required
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
                  {password === confirmPassword ? (
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

            {/* Mobile Number Field */}
            <div>
              <label htmlFor="mobile" className="block text-sm font-semibold text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <PhoneIcon className="w-4 h-4" />
                  Mobile Number
                </div>
              </label>
              <input
                type="tel"
                id="mobile"
                value={mobile}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ''); // Only allow digits
                  setMobile(value);
                }}
                placeholder="Enter your 10-digit mobile number"
                maxLength={10}
                className={`w-full p-4 border-2 rounded-lg focus:outline-none transition-colors text-sm ${
                  mobile && !/^\d{10}$/.test(mobile)
                    ? "border-red-500 focus:border-red-500"
                    : mobile && /^\d{10}$/.test(mobile)
                    ? "border-green-500 focus:border-green-500"
                    : "border-gray-200 focus:border-gray-400"
                }`}
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

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-white py-4 rounded-lg font-semibold text-sm md:text-base hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRightIcon className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Divider and Login link */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Already have an account?</span>
              </div>
            </div>
            <p className="text-center text-sm mt-4 text-gray-600">
              Sign in to your account{' '}
              <a href="/UserLogin" className="text-gray-800 font-semibold hover:text-gray-600 transition-colors">
                Login here
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
            alt="Register Illustration" 
            className="object-contain max-w-full max-h-full rounded-lg shadow-lg" 
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
