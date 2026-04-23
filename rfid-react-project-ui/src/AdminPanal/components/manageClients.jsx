import React, { useState, useEffect } from "react";
import { fetchClients, updateClientStatus } from "../service/api";
import { Search, ChevronRight, Users } from "lucide-react"; 
import Cookies from "js-cookie";

const ManageClients = () => {
  const adminData = Cookies.get("admin_data");
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
      // Optimistic update
      setClients((prevClients) =>
        prevClients.map((client) =>
          client.client_id === client_id ? { ...client, status: newStatus } : client
        )
      );
      await updateClientStatus(client_id, newStatus);
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
        <span className="text-green-600 font-bold">Manage Clients</span>
        <div className="ml-2 w-0.5 h-4 bg-green-500 skew-x-[-15deg]" />
      </div>

      {/* Header and Controls */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#1b2559]">Manage Clients</h2>
          <p className="text-sm text-gray-400 mt-1">View and control client access across the platform</p>
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
      ) : filteredClients.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 text-center">
           <Users className="w-12 h-12 text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400 text-sm font-medium">No clients found.</p>
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
                {filteredClients.map((client) => (
                  <tr
                    key={client.client_id}
                    className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors text-sm"
                  >
                    <td className="p-4 px-6 text-gray-500 font-medium">{client.client_id}</td>
                    <td className="p-4 font-semibold text-gray-800">{client.name}</td>
                    <td className="p-4 text-gray-500">{client.email}</td>
                    <td className="p-4 text-gray-500 tabular-nums">{client.mobile}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => toggleStatus(client.client_id, client.status)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors duration-200 border ${
                          client.status === 0
                            ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                            : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                        }`}
                        title="Click to toggle status"
                      >
                        {client.status === 0 ? "Active" : "Inactive"}
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

export default ManageClients;
