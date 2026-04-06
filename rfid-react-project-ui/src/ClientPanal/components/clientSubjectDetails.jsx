import React, { useState, useEffect } from 'react';
import { getClientSubjectDetails, editedSubject } from '../service/api';
import { Link, useNavigate } from "react-router-dom";
import { Outlet, useLocation } from "react-router-dom";
import {
  Key, Calendar, Clock, Tag, Users, BarChart2, Edit2, ChevronRight,
  CheckCircle, XCircle, Loader2, AlertCircle, RefreshCw, X, Save, ShieldAlert
} from 'lucide-react';

const formatToDDMMYY = (dateString) => {
  if (!dateString) return '—';
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = String(d.getFullYear()).slice(-2);
  return `${day}-${month}-${year}`;
};

const ClientSubjectDetail = ({ ct_id, subject_name }) => {
  const [subjectDetails, setSubjectDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedSubjectName, setEditedSubjectName] = useState(subject_name);
  const [isSaving, setIsSaving] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjectDetails = async () => {
      try {
        const data = await getClientSubjectDetails(ct_id);
        setSubjectDetails(data.data[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSubjectDetails();
  }, [ct_id]);

  useEffect(() => {
    setEditedSubjectName(subject_name);
  }, [subject_name]);

  const isOutletShown =
    location.pathname.includes('SubjectUserList') ||
    location.pathname.includes('UpdateTokenForClient') ||
    location.pathname.includes('ViewAttendanceBySubject');

  const handleSaveSubjectName = async () => {
    if (!editedSubjectName.trim()) return;
    setIsSaving(true);
    try {
      const result = await editedSubject(editedSubjectName, ct_id);
      if (result.success) {
        setIsEditModalOpen(false);
        navigate('/ClientDashboard');
      } else {
        setError('Failed to update subject name. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsSaving(false);
    }
  };

  // ── Loading ──────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f7fe] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-10 shadow-sm text-center">
          <Loader2 className="w-12 h-12 text-green-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Loading subject details...</p>
        </div>
      </div>
    );
  }

  if (error && !subjectDetails) {
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

  if (!subjectDetails) {
    return (
      <div className="min-h-screen bg-[#f4f7fe] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-10 shadow-sm text-center max-w-sm">
          <AlertCircle className="w-14 h-14 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-400 text-sm">No subject details available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans">

      {/* Render nested route outlet (SubjectUserList, UpdateToken, ViewAttendance) */}
      {isOutletShown ? (
        <Outlet />
      ) : (
        <>
          {/* ── Deactivated Plan Banner (shown FIRST if status is 0) ── */}
          {(subjectDetails.status === 1 || subjectDetails.status === '1') && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 rounded-xl p-2.5 flex-shrink-0">
                  <ShieldAlert className="w-6 h-6 text-amber-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-amber-800">Plan Deactivated</h4>
                    <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">
                      Pending Activation
                    </span>
                  </div>
                  <p className="text-amber-700 text-sm">
                    Your plan is currently <strong>inactive</strong>. An administrator needs to activate it before
                    you can use this subject for attendance tracking. If you just made a payment, please wait
                    for admin approval.
                  </p>
                  <Link to={`UpdateTokenForClient/${encodeURIComponent(ct_id)}`} className="inline-block mt-3">
                    <button className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-100 hover:bg-amber-200 border border-amber-200 px-3 py-1.5 rounded-lg transition-colors">
                      <RefreshCw className="w-3.5 h-3.5" />
                      Renew / Upgrade Plan
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-[#1b2559]">{subject_name}</h2>
                <p className="text-gray-400 text-sm mt-0.5">Manage subject users, attendance, and token</p>
              </div>
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <Link to={`SubjectUserList/${encodeURIComponent(ct_id)}`}>
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm">
                    <Users className="w-4 h-4" />
                    Manage Users
                  </button>
                </Link>
                <Link to={`ViewAttendanceBySubject/${encodeURIComponent(ct_id)}`}>
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm">
                    <BarChart2 className="w-4 h-4" />
                    Attendance
                  </button>
                </Link>
                <Link to={`UpdateTokenForClient/${encodeURIComponent(ct_id)}`}>
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm">
                    <RefreshCw className="w-4 h-4" />
                    Renew Token
                  </button>
                </Link>
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Name
                </button>
              </div>
            </div>
          </div>

          {/* Token Details Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {[
              {
                label: 'Pass Key',
                value: subjectDetails.pass_key,
                icon: Key,
                iconColor: 'text-green-600',
                iconBg: 'bg-green-50',
                valueClass: 'font-mono text-green-700 tracking-widest text-lg font-bold',
              },
              {
                label: 'Token Plan',
                value: subjectDetails.name || '—',
                icon: Tag,
                iconColor: 'text-indigo-600',
                iconBg: 'bg-indigo-50',
                valueClass: 'text-[#1b2559] font-bold text-lg',
              },
              {
                label: 'Price Paid',
                value: `₹${subjectDetails.price || '—'}`,
                icon: Tag,
                iconColor: 'text-amber-600',
                iconBg: 'bg-amber-50',
                valueClass: 'text-[#1b2559] font-bold text-lg',
              },
              {
                label: 'Purchase Date',
                value: formatToDDMMYY(subjectDetails.purchase_date),
                icon: Calendar,
                iconColor: 'text-green-600',
                iconBg: 'bg-green-50',
                valueClass: 'text-[#1b2559] font-bold text-base tabular-nums',
              },
              {
                label: 'Expire Date',
                value: formatToDDMMYY(subjectDetails.expire_date),
                icon: Clock,
                iconColor: 'text-red-500',
                iconBg: 'bg-red-50',
                valueClass: 'text-red-600 font-bold text-base tabular-nums',
              },
              {
                label: 'Duration',
                value: `${subjectDetails.duration_day || '—'} Days`,
                icon: Clock,
                iconColor: 'text-indigo-600',
                iconBg: 'bg-indigo-50',
                valueClass: 'text-[#1b2559] font-bold text-base',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`${item.iconBg} p-2 rounded-lg`}>
                    <item.icon className={`w-4 h-4 ${item.iconColor}`} strokeWidth={2} />
                  </div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">{item.label}</p>
                </div>
                <p className={item.valueClass}>{item.value}</p>
              </div>
            ))}

            {/* Plan Status Card */}
            <div className={`bg-white rounded-2xl p-5 shadow-sm border ${
              subjectDetails.status === 1 || subjectDetails.status === '1'
                ? 'border-green-100'
                : 'border-amber-200'
            }`}>
              <div className="flex items-center gap-2 mb-3">
                <div className={`p-2 rounded-lg ${
                  subjectDetails.status === 1 || subjectDetails.status === '1'
                    ? 'bg-green-50'
                    : 'bg-amber-50'
                }`}>
                  {subjectDetails.status === 0 || subjectDetails.status === '0'
                    ? <CheckCircle className="w-4 h-4 text-green-600" strokeWidth={2} />
                    : <ShieldAlert className="w-4 h-4 text-amber-600" strokeWidth={2} />
                  }
                </div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Plan Status</p>
              </div>
              {subjectDetails.status === 0 || subjectDetails.status === '0' ? (
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                  <CheckCircle className="w-3.5 h-3.5" /> Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  <ShieldAlert className="w-3.5 h-3.5" /> Deactivated
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          {subjectDetails.description && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-2">Plan Description</p>
              <p className="text-gray-700 text-sm font-medium">{subjectDetails.description}</p>
            </div>
          )}
        </>
      )}

      {/* Edit Subject Name Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-[#1b2559] flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-green-600" />
                Edit Subject Name
              </h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-100 rounded-xl p-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  New Subject Name
                </label>
                <input
                  type="text"
                  value={editedSubjectName}
                  onChange={(e) => setEditedSubjectName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all text-gray-800 font-medium text-sm"
                  placeholder="Enter new name..."
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveSubjectName}
                  disabled={isSaving || !editedSubjectName.trim()}
                  className="flex-1 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  {isSaving ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                  ) : (
                    <><Save className="w-4 h-4" /> Save</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientSubjectDetail;
