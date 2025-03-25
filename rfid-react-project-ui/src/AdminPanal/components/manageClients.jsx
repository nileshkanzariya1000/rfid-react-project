import React, { useState, useEffect } from "react";
import { fetchClients, updateClientStatus } from "../service/api";
import { Search } from "lucide-react"; // Import search icon
import Cookies from "js-cookie";


const ManageClients = () => {
  const adminData = Cookies.get("admin_data");
    // If no admin data is found, redirect to login
    if (!adminData) {
      window.location.href = "/";
    }
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadClients = async () => {
      try {
        setLoading(true);
        const response = await fetchClients();
        if (response && response.data) {
          const sortedClients = response.data.sort((a, b) => a.client_id - b.client_id);
          setClients(sortedClients);
          setFilteredClients(sortedClients);
        }
      } catch (error) {
        console.error("Failed to load clients", error);
      } finally {
        setLoading(false);
      }
    };
    loadClients();
  }, []);

  useEffect(() => {
    const results = clients.filter((client) =>
      `${client.name} ${client.email} ${client.mobile}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredClients(results);
  }, [searchTerm, clients]);

  const toggleStatus = async (client_id, currentStatus) => {
    try {
      const newStatus = currentStatus === 1 ? 0 : 1;
      await updateClientStatus(client_id, newStatus);
      setClients((prevClients) =>
        prevClients.map((client) =>
          client.client_id === client_id ? { ...client, status: newStatus } : client
        )
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Manage Clients
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
        <p className="text-center text-lg font-medium text-gray-700">Loading clients...</p>
      ) : filteredClients.length === 0 ? (
        <p className="text-center text-lg font-medium text-gray-600">No clients found.</p>
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
              {filteredClients.map((client, index) => (
                <tr
                  key={client.client_id}
                  className={`border-b hover:bg-gray-100 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="p-3">{client.client_id}</td>
                  <td className="p-3">{client.name}</td>
                  <td className="p-3">{client.email}</td>
                  <td className="p-3">{client.mobile}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-md text-sm font-medium ${
                        client.status === 0
                          ? "bg-green-200 text-green-700"
                          : "bg-red-200 text-red-700"
                      }`}
                    >
                      {client.status === 0 ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => toggleStatus(client.client_id, client.status)}
                      className={`px-3 py-1 text-white rounded-md ${
                        client.status === 0 ? "bg-red-500 hover:bg-red-700" : "bg-green-500 hover:bg-green-700"
                      }`}
                    >
                      {client.status === 0 ? "Deactivate" : "Activate"}
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

export default ManageClients;
