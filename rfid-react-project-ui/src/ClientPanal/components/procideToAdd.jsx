import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTokenById, initiateRazorpayPayment } from '../service/api';
import {
  Key, BookOpen, CreditCard, CheckCircle, AlertCircle, Loader2, ChevronRight, Tag
} from 'lucide-react';

const ProcideToAdd = () => {
  const { token_id } = useParams();
  const navigate = useNavigate();

  const [tokenDetails, setTokenDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subjectName, setSubjectName] = useState('');
  const [passKey, setPassKey] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null); // null | 'processing' | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const fetchTokenDetails = async () => {
      try {
        setLoading(true);
        const data = await getTokenById(token_id);
        setTokenDetails(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const generatePassKey = () => Math.random().toString(36).substr(2, 10).toUpperCase();
    setPassKey(generatePassKey());
    fetchTokenDetails();

    // Load Razorpay script
    const script = document.createElement('script');
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, [token_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subjectName.trim()) {
      setError('Please enter a subject name.');
      return;
    }
    setPaymentStatus('processing');
    setStatusMessage('');
    try {
      const message = await initiateRazorpayPayment({ tokenDetails, passKey, subjectName, token_id });
      setPaymentStatus('success');
      setStatusMessage(message || 'Subject added successfully!');
      // Navigate to dashboard after short delay so user sees success
      setTimeout(() => {
        navigate('/ClientDashboard');
      }, 2000);
    } catch (err) {
      setPaymentStatus('error');
      setStatusMessage(typeof err === 'string' ? err : (err?.message || 'Payment failed or was cancelled.'));
    }
  };

  // ── Loading ──────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f7fe] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-10 shadow-sm text-center">
          <Loader2 className="w-12 h-12 text-green-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Loading token details...</p>
        </div>
      </div>
    );
  }

  if (error && !tokenDetails) {
    return (
      <div className="min-h-screen bg-[#f4f7fe] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-10 shadow-sm text-center max-w-sm">
          <AlertCircle className="w-14 h-14 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-800 mb-2">Failed to load</h3>
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  // ── Pending Activation (after payment success) ──────────────────
  if (paymentStatus === 'success') {
    return (
      <div className="min-h-screen bg-[#f4f7fe] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-10 shadow-sm text-center max-w-md border border-amber-100">
          {/* Icon */}
          <div className="bg-amber-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <Clock className="w-12 h-12 text-amber-500" />
          </div>

          <h3 className="text-2xl font-extrabold text-[#1b2559] mb-2">Payment Received!</h3>
          <p className="text-gray-500 text-sm mb-6">
            Your subject has been created successfully. However, your plan is currently{" "}
            <span className="font-bold text-amber-600">Pending Activation</span>.
          </p>

          {/* Status Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-left">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-amber-800 font-bold text-sm">Your plan is deactivated</p>
                <p className="text-amber-700 text-xs mt-1">
                  An administrator needs to review and activate your plan before you can use it.
                  This usually takes a short time. You will be able to use the subject once activated.
                </p>
              </div>
            </div>
          </div>

          <p className="text-gray-400 text-xs">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  // ── Main ─────────────────────────────────────────────────────────
  return (
    <div className="font-sans">

      <div className="max-w-2xl mx-auto">

        {/* Token Summary Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <h3 className="text-base font-bold text-gray-800 flex items-center gap-2 mb-5">
            <Tag className="w-4 h-4 text-green-600" />
            Selected Plan
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Plan Name</p>
              <p className="text-lg font-extrabold text-[#1b2559]">{tokenDetails?.name || '—'}</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 border border-green-100">
              <p className="text-xs text-green-600 font-semibold uppercase tracking-wide mb-1">Price</p>
              <p className="text-lg font-extrabold text-green-700">₹{tokenDetails?.price || '0'}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Validity</p>
              <p className="text-base font-bold text-[#1b2559]">{tokenDetails?.duration_day || '—'} Days</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Description</p>
              <p className="text-sm font-medium text-gray-600 truncate">{tokenDetails?.description || 'Standard plan'}</p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-base font-bold text-gray-800 flex items-center gap-2 mb-5">
            <BookOpen className="w-4 h-4 text-green-600" />
            Subject Details
          </h3>

          {/* Error banner */}
          {paymentStatus === 'error' && (
            <div className="mb-5 bg-red-50 border border-red-100 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-700 font-semibold text-sm">Payment Failed</p>
                <p className="text-red-500 text-xs mt-0.5">{statusMessage}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Pass Key — Read Only */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Auto-Generated Pass Key
              </label>
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                <Key className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="font-mono font-bold text-green-700 tracking-widest text-sm">{passKey}</span>
                <span className="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Read Only</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">This key is auto-generated and will be linked to your subject.</p>
            </div>

            {/* Subject Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Subject Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={subjectName}
                onChange={(e) => { setSubjectName(e.target.value); setError(null); }}
                required
                placeholder="e.g. Mathematics, Physics Lab..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all text-gray-800 font-medium text-sm"
              />
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={paymentStatus === 'processing'}
              className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-sm shadow-green-200 text-sm"
            >
              {paymentStatus === 'processing' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  Pay ₹{tokenDetails?.price || '0'} & Create Subject
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProcideToAdd;
