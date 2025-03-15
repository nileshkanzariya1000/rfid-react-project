import React, { useState, useEffect } from "react";
import { fetchClients, updateClientStatus } from "../service/api";

const ManageClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadClients = async () => {
      try {
        setLoading(true);
        const response = await fetchClients();
        setClients(response.data);
      } catch (error) {
        console.error("Failed to load clients", error);
      } finally {
        setLoading(false);
      }
    };

    loadClients();
  }, []);

  const toggleStatus = async (client_id, currentStatus) => {
    try {
      const newStatus = currentStatus === 1 ? 0 : 1;
      await updateClientStatus(client_id, newStatus);

      // Update UI after successful status change
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

      {loading ? (
        <p className="text-center text-lg font-medium text-gray-700">Loading clients...</p>
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
              {clients.map((client, index) => (
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
                        client.status === 1
                          ? "bg-green-200 text-green-700"
                          : "bg-red-200 text-red-700"
                      }`}
                    >
                      {client.status === 1 ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => toggleStatus(client.client_id, client.status)}
                      className={`px-3 py-1 text-white rounded-md ${
                        client.status === 1 ? "bg-red-500" : "bg-green-500"
                      }`}
                    >
                      {client.status === 1 ? "Deactivate" : "Activate"}
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
