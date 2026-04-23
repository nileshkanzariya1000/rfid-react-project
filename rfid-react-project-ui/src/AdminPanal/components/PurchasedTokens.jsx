import React, { useEffect, useState } from "react";
import { fetchPurchasedTokens, updatePurchasedTokenStatus } from "../service/api";
import { Search, ChevronRight } from "lucide-react";
import Cookies from "js-cookie";

const PurchasedTokens = () => {
  const adminData = Cookies.get("admin_data");
  if (!adminData) {
    window.location.href = "/";
  }
  
  const [tokens, setTokens] = useState([]);
  const [filteredTokens, setFilteredTokens] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await fetchPurchasedTokens();

        if (!response || !response.success || !Array.isArray(response.data)) {
          throw new Error("Invalid API response format");
        }

        setTokens(response.data);
        setFilteredTokens(response.data);
      } catch (err) {
        setError(err.message);
        setTokens([]);
        setFilteredTokens([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  const handleToggleStatus = async (ct_id, currentStatus) => {
    try {
      const newStatus = currentStatus === 0 ? 1 : 0;
      
      // Optimistic update
      setTokens((prevTokens) =>
        prevTokens.map((token) =>
          token.ct_id === ct_id ? { ...token, status: newStatus } : token
        )
      );

      await updatePurchasedTokenStatus(ct_id, newStatus);
    } catch (err) {
      console.error(err);
      alert("Failed to update token status. Please try again.");
    }
  };

  // Handle search functionality
  useEffect(() => {
    const filtered = tokens.filter((token) =>
      [token.name, token.email, token.token_id]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredTokens(filtered);
  }, [searchTerm, tokens]);


  const formatToDDMMYY = (dateString) => {
    if (!dateString) return "—";
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "—";
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = String(d.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="p-5 lg:p-8 font-sans text-gray-800">
      
      {/* ── Breadcrumb ───── */}
      <div className="flex items-center text-sm font-semibold text-gray-400 mb-6">
        <span className="text-green-600 uppercase tracking-wider">Admin</span>
        <ChevronRight className="w-4 h-4 mx-1" />
        <span className="text-green-600 font-bold">Purchased Tokens</span>
        <div className="ml-2 w-0.5 h-4 bg-green-500 skew-x-[-15deg]" />
      </div>

      {/* Header and Controls */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#1b2559]">Purchased Tokens</h2>
          <p className="text-sm text-gray-400 mt-1">Manage and track client token purchases</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or token ID..."
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
      ) : error ? (
        <div className="bg-red-50 text-red-600 border border-red-200 p-4 rounded-2xl text-sm font-medium text-center">
          {error}
        </div>
      ) : filteredTokens.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 text-center">
          <p className="text-gray-400 text-sm font-medium">No purchased tokens found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-400 text-xs font-bold uppercase tracking-wide border-b border-gray-100">
                  <th className="p-4 px-5">CT ID</th>
                  <th className="p-4">Client Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Token ID</th>
                  <th className="p-4">Pass Key</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Purchased</th>
                  <th className="p-4">Expires</th>
                  <th className="p-4 pr-5">Subject</th>
                </tr>
              </thead>
              <tbody>
                {filteredTokens.map((token, index) => (
                  <tr
                    key={token.ct_id}
                    className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors text-sm"
                  >
                    <td className="p-4 px-5 text-gray-500 font-medium">{token.ct_id}</td>
                    <td className="p-4 text-gray-800 font-semibold">{token.name}</td>
                    <td className="p-4 text-gray-500">{token.email}</td>
                    <td className="p-4 text-gray-500">{token.token_id}</td>
                    <td className="p-4 text-gray-400 font-mono text-xs">{token.pass_key}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleToggleStatus(token.ct_id, token.status)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors duration-200 border ${
                          token.status === 0
                            ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                            : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                        }`}
                      >
                        {token.status === 0 ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="p-4 text-gray-500 tabular-nums">
                      {formatToDDMMYY(token.purchase_date)}
                    </td>
                    <td className="p-4 text-gray-500 tabular-nums">
                      {formatToDDMMYY(token.expire_date)}
                    </td>
                    <td className="p-4 pr-5">
                      <span className="truncate block max-w-[120px] text-gray-600 font-medium" title={token.subject_name}>
                        {token.subject_name || "—"}
                      </span>
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

export default PurchasedTokens;
