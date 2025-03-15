import React, { useState, useEffect } from "react";
import { fetchUsers, updateUserStatus } from "../service/api";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const response = await fetchUsers();
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to load users", error);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

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

      {loading ? (
        <p className="text-center text-lg font-medium text-gray-700">
          Loading users...
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
              {users.map((user, index) => (
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
                        user.status === 1
                          ? "bg-green-200 text-green-700"
                          : "bg-red-200 text-red-700"
                      }`}
                    >
                      {user.status === 1 ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => toggleStatus(user.user_id, user.status)}
                      className={`px-3 py-1 rounded-md text-sm font-medium text-white ${
                        user.status === 1
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {user.status === 1 ? "Deactivate" : "Activate"}
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
