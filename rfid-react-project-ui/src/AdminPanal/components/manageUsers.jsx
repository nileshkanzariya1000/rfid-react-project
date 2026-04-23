import React, { useState, useEffect } from "react";
import { fetchUsers, updateUserStatus } from "../service/api";
import { Search, ChevronRight, Users } from "lucide-react"; 
import Cookies from "js-cookie";

const ManageUsers = () => {
  const adminData = Cookies.get("admin_data");
  if (!adminData) {
    window.location.href = "/";
  }
  
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const response = await fetchUsers();
        if (response && response.data) {
          const sortedUsers = response.data.sort((a, b) => a.user_id - b.user_id);
          setUsers(sortedUsers);
          setFilteredUsers(sortedUsers);
        }
      } catch (error) {
        console.error("Failed to load users", error);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  useEffect(() => {
    const results = users.filter((user) =>
      `${user.name} ${user.email} ${user.mobile}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  const toggleStatus = async (user_id, currentStatus) => {
    try {
      const newStatus = currentStatus === 1 ? 0 : 1;
      // Optimistic update
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.user_id === user_id ? { ...user, status: newStatus } : user
        )
      );
      await updateUserStatus(user_id, newStatus);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div className="p-5 lg:p-8 font-sans text-gray-800 bg-[#f4f7fe] min-h-screen">
      
      {/* ── Breadcrumb ───── */}
      <div className="flex items-center text-sm font-semibold text-gray-400 mb-6">
        <span className="text-green-600 uppercase tracking-wider">Admin</span>
        <ChevronRight className="w-4 h-4 mx-1" />
        <span className="text-green-600 font-bold">Manage Users</span>
        <div className="ml-2 w-0.5 h-4 bg-green-500 skew-x-[-15deg]" />
      </div>

      {/* Header and Controls */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#1b2559]">Manage Users</h2>
          <p className="text-sm text-gray-400 mt-1">View and control end-user access across the platform</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or mobile..."
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-sm outline-none bg-gray-50 hover:bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Main Table */}
      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-white rounded-2xl shadow-sm"></div>
          <div className="h-64 bg-white rounded-2xl shadow-sm"></div>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 text-center">
           <Users className="w-12 h-12 text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400 text-sm font-medium">No users found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-400 text-xs font-bold uppercase tracking-wide border-b border-gray-100">
                  <th className="p-4 px-6 w-20">ID</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Mobile</th>
                  <th className="p-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.user_id}
                    className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors text-sm"
                  >
                    <td className="p-4 px-6 text-gray-500 font-medium">{user.user_id}</td>
                    <td className="p-4 font-semibold text-gray-800">{user.name}</td>
                    <td className="p-4 text-gray-500">{user.email}</td>
                    <td className="p-4 text-gray-500 tabular-nums">{user.mobile}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => toggleStatus(user.user_id, user.status)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors duration-200 border ${
                          user.status === 0
                            ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                            : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                        }`}
                        title="Click to toggle status"
                      >
                        {user.status === 0 ? "Active" : "Inactive"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
