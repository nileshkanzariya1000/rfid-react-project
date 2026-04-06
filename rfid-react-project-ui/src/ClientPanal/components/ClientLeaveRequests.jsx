import React, { useState, useEffect } from "react";
import { getLeaveRequests, updateLeaveStatus } from "../service/api";
import { Check, X, Calendar } from "lucide-react";

const ClientLeaveRequests = () => {
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(null);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        fetchLeaves();
    }, []);

    const fetchLeaves = async () => {
        setLoading(true);
        try {
            const response = await getLeaveRequests();
            if (response.success) {
                if (response.data && Array.isArray(response.data)) setLeaves(response.data);
                else if (response.data?.leaves && Array.isArray(response.data.leaves)) setLeaves(response.data.leaves);
                else if (response.data?.data && Array.isArray(response.data.data)) setLeaves(response.data.data);
                else setLeaves([]);
            }
        } catch (err) {
            console.error("Failed to fetch leaves", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (leaveId, status) => {
        if (!confirm(`Are you sure you want to ${status.toLowerCase()} this request?`)) return;
        
        setActionLoading(leaveId);
        try {
            const response = await updateLeaveStatus(leaveId, status);
            if (response.success) {
                setLeaves(leaves.map(l => l.id === leaveId ? { ...l, status: status } : l));
            } else {
                alert("Failed to update status");
            }
        } catch (error) {
            alert("Something went wrong");
        } finally {
            setActionLoading(null);
        }
    };

    const getInitials = (name) => {
        if (!name) return "U";
        return name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2);
    };

    const calculateDays = (start, end) => {
        const d1 = new Date(start);
        const d2 = new Date(end);
        const diffTime = Math.abs(d2 - d1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        return diffDays;
    };

    const formatDateRange = (start, end) => {
        return `${start} - ${end}`;
    };

    const stats = {
        total: leaves.length,
        pending: leaves.filter(l => l.status === "Pending").length,
        approved: leaves.filter(l => l.status === "Approved").length,
        rejected: leaves.filter(l => l.status === "Rejected").length,
    };

    const filteredLeaves = filter === "All" ? leaves : leaves.filter(l => l.status === filter);

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Leave Requests</h1>
                <p className="text-gray-500 text-sm mt-1">Manage User leave requests and approvals</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-[#f2f7ff] border border-[#d6e4ff] rounded-xl p-5">
                    <p className="text-[#2b6cb0] text-sm font-medium mb-1">Total Requests</p>
                    <h3 className="text-3xl font-bold text-[#2b6cb0]">{stats.total}</h3>
                </div>
                <div className="bg-[#fffdf0] border border-[#fcefc7] rounded-xl p-5">
                    <p className="text-[#b7791f] text-sm font-medium mb-1">Pending</p>
                    <h3 className="text-3xl font-bold text-[#b7791f]">{stats.pending}</h3>
                </div>
                <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl p-5">
                    <p className="text-[#15803d] text-sm font-medium mb-1">Approved</p>
                    <h3 className="text-3xl font-bold text-[#15803d]">{stats.approved}</h3>
                </div>
                <div className="bg-[#fff5f5] border border-[#fed7d7] rounded-xl p-5">
                    <p className="text-[#c53030] text-sm font-medium mb-1">Rejected</p>
                    <h3 className="text-3xl font-bold text-[#c53030]">{stats.rejected}</h3>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 mb-6 flex gap-2">
                {["All", "Pending", "Approved", "Rejected"].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                            filter === f 
                                ? "bg-[#00c950] text-white" 
                                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="space-y-4">
                {loading ? (
                    <div className="text-center py-10 text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100">Loading requests...</div>
                ) : filteredLeaves.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100">No leave requests found.</div>
                ) : (
                    filteredLeaves.map(leave => (
                        <div key={leave.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-shadow hover:shadow-md">
                            
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-[#d32f2f] text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                                    {getInitials(leave.user_name)}
                                </div>
                                
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-lg font-bold text-gray-900">{leave.user_name}</h3>
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            leave.status === 'Pending' ? 'bg-[#fffdf0] text-[#b7791f] border border-[#fcefc7]' :
                                            leave.status === 'Approved' ? 'bg-[#f0fdf4] text-[#15803d] border border-[#bbf7d0]' :
                                            'bg-[#fff5f5] text-[#c53030] border border-[#fed7d7]'
                                        }`}>
                                            {leave.status}
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                                        <Calendar size={14} />
                                        <span>{leave.reason?.split(" ")[0] || "Leave"}</span>
                                    </div>

                                    <div className="text-sm">
                                        <span className="font-semibold text-gray-700">Reason: </span>
                                        <span className="text-gray-500">{leave.reason}</span>
                                    </div>
                                    <div className="text-xs text-gray-400 mt-1">
                                        Applied on {new Date(leave.created_at).toISOString().split('T')[0]}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-12 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                                <div className="flex items-center gap-2 text-gray-500 text-sm whitespace-nowrap">
                                    <Calendar size={16} />
                                    <span>{calculateDays(leave.start_date, leave.end_date)} days</span>
                                </div>

                                <div className="text-gray-500 text-sm whitespace-nowrap font-mono bg-gray-50 px-3 py-1 rounded-md">
                                    {formatDateRange(leave.start_date, leave.end_date)}
                                </div>

                                <div className="flex gap-2 w-full md:w-auto self-end">
                                    {leave.status === "Pending" ? (
                                        <>
                                            <button 
                                                onClick={() => handleAction(leave.id, "Approved")}
                                                disabled={actionLoading === leave.id}
                                                className="flex items-center justify-center gap-1.5 px-4 py-2 bg-[#00a843] hover:bg-[#009139] text-white rounded-lg text-sm font-medium transition-colors"
                                            >
                                                <Check size={16} strokeWidth={3} /> Approve
                                            </button>
                                            <button 
                                                onClick={() => handleAction(leave.id, "Rejected")}
                                                disabled={actionLoading === leave.id}
                                                className="flex items-center justify-center gap-1.5 px-4 py-2 bg-[#d32f2f] hover:bg-[#b72828] text-white rounded-lg text-sm font-medium transition-colors"
                                            >
                                                <X size={16} strokeWidth={3} /> Reject
                                            </button>
                                        </>
                                    ) : (
                                        <div className="px-4 py-2 invisible">Placeholder</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ClientLeaveRequests;
