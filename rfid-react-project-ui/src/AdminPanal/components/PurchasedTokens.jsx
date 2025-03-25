import React, { useEffect, useState } from "react";
import { fetchPurchasedTokens } from "../service/api";
import { Search, ArrowUp, ArrowDown } from "lucide-react";
import Cookies from "js-cookie";


const PurchasedTokens = () => {
  const adminData = Cookies.get("admin_data");
    // If no admin data is found, redirect to login
    if (!adminData) {
      window.location.href = "/";
    }
  const [tokens, setTokens] = useState([]);
  const [filteredTokens, setFilteredTokens] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: "ct_id", direction: "asc" });

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

  // Sorting Function
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedData = [...filteredTokens].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredTokens(sortedData);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Purchased Tokens
      </h2>

      {/* Search and Sorting */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        {/* Search Bar */}
        <div className="relative w-full md:w-2/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name, email, or token ID..."
            className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Sorting Dropdown */}
        <div className="relative w-full md:w-1/3">
          <select
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={sortConfig.key}
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="ct_id">Sort by CT ID</option>
            <option value="name">Sort by Client Name</option>
            <option value="email">Sort by Email</option>
            <option value="token_id">Sort by Token ID</option>
            <option value="status">Sort by Status</option>
            <option value="purchase_date">Sort by Purchase Date</option>
            <option value="expire_date">Sort by Expire Date</option>
          </select>
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700"
            onClick={() => handleSort(sortConfig.key)}
          >
            {sortConfig.direction === "asc" ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-lg font-medium text-gray-700">
          Loading tokens...
        </p>
      ) : error ? (
        <p className="text-center text-lg font-medium text-red-600">{error}</p>
      ) : filteredTokens.length === 0 ? (
        <p className="text-center text-lg font-medium text-gray-600">
          No tokens found.
        </p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="w-full border border-gray-300 bg-white rounded-lg">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-3 text-left">CT ID</th>
                <th className="p-3 text-left">Client Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Token ID</th>
                <th className="p-3 text-left">Pass Key</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Purchase Date</th>
                <th className="p-3 text-left">Expire Date</th>
                <th className="p-3 text-left">Subject</th>
              </tr>
            </thead>
            <tbody>
              {filteredTokens.map((token, index) => (
                <tr
                  key={token.ct_id}
                  className={`border-b hover:bg-gray-100 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="p-3">{token.ct_id}</td>
                  <td className="p-3">{token.name}</td>
                  <td className="p-3">{token.email}</td>
                  <td className="p-3">{token.token_id}</td>
                  <td className="p-3">{token.pass_key}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-md text-sm font-medium ${
                        token.status === 0
                          ? "bg-green-200 text-green-700"
                          : "bg-red-200 text-red-700"
                      }`}
                    >
                      {token.status === 0 ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-3">{token.purchase_date || "N/A"}</td>
                  <td className="p-3">{token.expire_date || "N/A"}</td>
                  <td className="p-3">{token.subject_name || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PurchasedTokens;
