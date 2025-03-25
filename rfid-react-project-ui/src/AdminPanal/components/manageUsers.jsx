import React, { useState, useEffect } from "react";
import { fetchUsers, updateUserStatus } from "../service/api";
import { Search } from "lucide-react"; // Import search icon
import Cookies from "js-cookie";


const ManageUsers = () => {
  const adminData = Cookies.get("admin_data");
    // If no admin data is found, redirect to login
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
      await updateUserStatus(user_id, newStatus);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.user_id === user_id ? { ...user, status: newStatus } : user
        )
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Manage Users
      </h2>

      {/* Search Bar with Icon */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search by name, email, or mobile..."
          className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="text-center text-lg font-medium text-gray-700">
          Loading users...
        </p>
      ) : filteredUsers.length === 0 ? (
        <p className="text-center text-lg font-medium text-gray-600">
          No users found.
        </p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="w-full border border-gray-300 bg-white rounded-lg">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Mobile</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr
                  key={user.user_id}
                  className={`border-b hover:bg-gray-100 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="p-3">{user.user_id}</td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.mobile}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-md text-sm font-medium ${
                        user.status === 0
                          ? "bg-green-200 text-green-700"
                          : "bg-red-200 text-red-700"
                      }`}
                    >
                      {user.status === 0 ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => toggleStatus(user.user_id, user.status)}
                      className={`px-3 py-1 rounded-md text-sm font-medium text-white ${
                        user.status === 0
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {user.status === 0 ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
