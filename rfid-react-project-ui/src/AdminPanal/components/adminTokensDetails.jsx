import React, { useState, useEffect } from "react";
import { getTokensForAdmin, editTokenDetails, toggleTokenStatus } from "../service/api";
import { Search, Edit, Check } from "lucide-react";

const AdminTokensDetails = () => {
  const [tokens, setTokens] = useState([]);
  const [filteredTokens, setFilteredTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editTokenId, setEditTokenId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await getTokensForAdmin();
        if (response?.success && Array.isArray(response.data)) {
          const sortedTokens = response.data.sort((a, b) => a.token_id - b.token_id);
          setTokens(sortedTokens);
          setFilteredTokens(sortedTokens);
        } else {
          setError("Invalid response format from server.");
        }
      } catch (error) {
        setError("Failed to load tokens.");
      } finally {
        setLoading(false);
      }
    };
    fetchTokens();
  }, []);

  useEffect(() => {
    const results = tokens.filter((token) =>
      `${token.name} ${token.description}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTokens(results);
  }, [searchTerm, tokens]);

  const handleEditClick = (token) => {
    setEditTokenId(token.token_id);
    setEditData({
      name: token.name,
      price: token.price,
      duration_day: token.duration_day,
      description: token.description,
    });
  };

  const handleSaveEdit = async (tokenId) => {
    try {
      const response = await editTokenDetails({ token_id: tokenId, ...editData });

      if (response?.success) {
        const updatedTokens = tokens.map((token) =>
          token.token_id === tokenId ? { ...token, ...editData } : token
        );
        setTokens(updatedTokens);
        setFilteredTokens(updatedTokens);
        setEditTokenId(null);
      } else {
        alert("Failed to update token details");
      }
    } catch (error) {
      alert("Error updating token");
    }
  };

  const handleToggleStatus = async (tokenId, currentStatus) => {
    try {
      const newStatus = currentStatus === 1 ? 0 : 1;
      const response = await toggleTokenStatus(tokenId, newStatus);

      if (response?.success) {
        const updatedTokens = tokens.map((token) =>
          token.token_id === tokenId ? { ...token, status: newStatus } : token
        );
        setTokens(updatedTokens);
        setFilteredTokens(updatedTokens);
      } else {
        alert("Failed to update token status");
      }
    } catch (error) {
      alert("Error updating token status");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Manage Tokens</h2>

      {/* Search Bar */}
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-2/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name or description..."
            className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <p className="text-center text-lg font-medium text-gray-700">Loading tokens...</p>
      ) : error ? (
        <p className="text-center text-lg font-medium text-red-600">{error}</p>
      ) : filteredTokens.length === 0 ? (
        <p className="text-center text-lg font-medium text-gray-600">No tokens found.</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="w-full border border-gray-300 bg-white rounded-lg">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Price ($)</th>
                <th className="p-3 text-left">Duration (Days)</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTokens.map((token) => (
                <tr key={token.token_id} className="border-b hover:bg-gray-100">
                  <td className="p-3">{token.token_id}</td>
                  <td className="p-3">
                    {editTokenId === token.token_id ? (
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      token.name
                    )}
                  </td>
                  <td className="p-3">
                    {editTokenId === token.token_id ? (
                      <input
                        type="number"
                        value={editData.price}
                        onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      `$${parseFloat(token.price).toFixed(2)}`
                    )}
                  </td>
                  <td className="p-3">
                    {editTokenId === token.token_id ? (
                      <input
                        type="number"
                        value={editData.duration_day}
                        onChange={(e) => setEditData({ ...editData, duration_day: e.target.value })}
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      `${token.duration_day} days`
                    )}
                  </td>
                  <td className="p-3">
                    {editTokenId === token.token_id ? (
                      <input
                        type="text"
                        value={editData.description}
                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      token.description
                    )}
                  </td>
                  <td className="p-3">
                    <button
                      className={`px-3 py-1 rounded text-white ${token.status === 1 ? "bg-green-500" : "bg-red-500"}`}
                      onClick={() => handleToggleStatus(token.token_id, token.status)}
                    >
                      {token.status === 1 ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="p-3 flex space-x-2">
                    {editTokenId === token.token_id ? (
                      <Check
                        className="text-green-500 cursor-pointer"
                        onClick={() => handleSaveEdit(token.token_id)}
                      />
                    ) : (
                      <Edit
                        className="text-blue-500 cursor-pointer"
                        onClick={() => handleEditClick(token)}
                      />
                    )}
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

export default AdminTokensDetails;
