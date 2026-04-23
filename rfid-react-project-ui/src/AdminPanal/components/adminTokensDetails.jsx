import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import {
  getTokensForAdmin,
  editTokenDetails,
  addNewToken,
} from "../service/api";
import { Search, Edit, Check, PlusCircle, X, ChevronRight, Hash, Activity } from "lucide-react";

const AdminTokensDetails = () => {
  const adminData = Cookies.get("admin_data");
    // If no admin data is found, redirect to login
    if (!adminData) {
      window.location.href = "/";
    }
  const [tokens, setTokens] = useState([]);
  const [filteredTokens, setFilteredTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newToken, setNewToken] = useState({
    name: "",
    price: "",
    duration_day: "",
    description: "",
  });
  const [editingToken, setEditingToken] = useState(null);
  const navigate = useNavigate();

  // Fetch tokens on component mount
  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await getTokensForAdmin();
        if (response?.success && Array.isArray(response.data)) {
          const sortedTokens = response.data.sort((a, b) => a.token_id - b.token_id);
          setTokens(sortedTokens);
          setFilteredTokens(sortedTokens);
        } else {
          throw new Error("Invalid response format from server.");
        }
      } catch (err) {
        setError(err.message || "Failed to load tokens.");
      } finally {
        setLoading(false);
      }
    };
    fetchTokens();
  }, []);

  // Filter tokens based on search term
  useEffect(() => {
    setFilteredTokens(
      tokens.filter((token) =>
        `${token.name} ${token.description}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, tokens]);

  // Handle adding a new token
  const handleAddToken = async () => {
    try {
      const response = await addNewToken(newToken);
      if (response?.success) {
        setTokens([...tokens, response.data]);
        setFilteredTokens([...tokens, response.data]);
        setShowModal(false);
        setNewToken({ name: "", price: "", duration_day: "", description: "" });
        navigate(0); // Refresh the page
      } else {
        alert("Failed to add token");
      }
    } catch (err) {
      alert("Error adding token: " + (err.message || "Unknown error"));
    }
  };

  // Handle editing a token
  const handleEditToken = (token) => {
    setEditingToken({
      token_id: token.token_id,
      name: token.name,
      price: token.price,
      duration_day: token.duration_day,
      description: token.description,
      status: token.status,
    });
    setShowEditModal(true);
  };

  // Handle updating a token
  const handleUpdateToken = async () => {
    try {
      const response = await editTokenDetails(editingToken);
      if (response?.success) {
        const updatedTokens = tokens.map((token) =>
          token.token_id === editingToken.token_id ? editingToken : token
        );
        setTokens(updatedTokens);
        setFilteredTokens(updatedTokens);
        setShowEditModal(false);
        setEditingToken(null);
      } else {
        alert("Failed to update token");
      }
    } catch (err) {
      alert("Error updating token: " + (err.message || "Unknown error"));
    }
  };

  return (
    <div className="p-5 lg:p-8 font-sans text-gray-800 bg-[#f4f7fe] min-h-screen">
      
      {/* ── Breadcrumb ───── */}
      <div className="flex items-center text-sm font-semibold text-gray-400 mb-6">
        <span className="text-green-600 uppercase tracking-wider">Admin</span>
        <ChevronRight className="w-4 h-4 mx-1" />
        <span className="text-green-600 font-bold">Manage Tokens</span>
        <div className="ml-2 w-0.5 h-4 bg-green-500 skew-x-[-15deg]" />
      </div>

      {/* Header and Controls */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#1b2559]">Manage Tokens</h2>
          <p className="text-sm text-gray-400 mt-1">Create and configure token subscription plans</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tokens..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-sm outline-none bg-gray-50 hover:bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors text-sm shadow-sm"
          >
            <PlusCircle className="w-4 h-4" /> Add Token
          </button>
        </div>
      </div>

      {/* Add Token Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
          <div className="bg-white p-6 rounded-3xl shadow-xl w-full max-w-md transform transition-all duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#1b2559]">Add New Token</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:bg-gray-100 hover:text-gray-600 p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5"/>
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {Object.keys(newToken).map((key) => (
                <div key={key}>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 ml-1">{key.replace("_", " ")}</label>
                  <input
                    type={key === "price" || key === "duration_day" ? "number" : "text"}
                    placeholder={`Enter ${key.replace("_", " ")}`}
                    value={newToken[key]}
                    onChange={(e) => setNewToken({ ...newToken, [key]: e.target.value })}
                    className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-gray-50 text-sm"
                  />
                </div>
              ))}
              <button
                onClick={handleAddToken}
                className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <PlusCircle className="w-5 h-5" /> Save Token
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Token Modal */}
      {showEditModal && editingToken && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
          <div className="bg-white p-6 rounded-3xl shadow-xl w-full max-w-md transform transition-all duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#1b2559]">Edit Token #{editingToken.token_id}</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:bg-gray-100 hover:text-gray-600 p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5"/>
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 ml-1">Name</label>
                <input
                  type="text"
                  value={editingToken.name}
                  onChange={(e) => setEditingToken({ ...editingToken, name: e.target.value })}
                  className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 ml-1">Price (₹)</label>
                <input
                  type="number"
                  value={editingToken.price}
                  onChange={(e) => setEditingToken({ ...editingToken, price: e.target.value })}
                  className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 ml-1">Duration (Days)</label>
                <input
                  type="number"
                  value={editingToken.duration_day}
                  onChange={(e) => setEditingToken({ ...editingToken, duration_day: e.target.value })}
                  className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 ml-1">Description</label>
                <input
                  type="text"
                  value={editingToken.description}
                  onChange={(e) => setEditingToken({ ...editingToken, description: e.target.value })}
                  className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 ml-1">Status</label>
                <select
                  value={editingToken.status}
                  onChange={(e) => setEditingToken({ ...editingToken, status: parseInt(e.target.value) })}
                  className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 text-sm appearance-none"
                >
                  <option value={0}>Active</option>
                  <option value={1}>Inactive</option>
                </select>
              </div>
              <button
                onClick={handleUpdateToken}
                className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-md shadow-blue-500/20"
              >
                <Check className="w-5 h-5"/> Update Token
              </button>
            </div>
          </div>
        </div>
      )}

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
          <p className="text-gray-400 text-sm font-medium">No tokens found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-400 text-xs font-bold uppercase tracking-wide border-b border-gray-100">
                  <th className="p-4 px-6 w-20">ID</th>
                  <th className="p-4">Name</th>
                  <th className="p-4 text-right">Price (₹)</th>
                  <th className="p-4 text-center">Duration</th>
                  <th className="p-4 max-w-xs">Description</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTokens.map((token) => (
                  <tr key={token.token_id} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors text-sm">
                    <td className="p-4 px-6">
                      <span className="flex items-center gap-1 text-gray-500 font-medium">
                        <Hash className="w-3 h-3 text-gray-300" />
                        {token.token_id}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-gray-800">{token.name}</td>
                    <td className="p-4 text-right tabular-nums font-medium text-gray-600">
                      ₹{parseFloat(token.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-4 text-center text-gray-600">
                      <span className="bg-gray-100 px-2.5 py-1 rounded-md text-xs font-medium">
                        {token.duration_day} Days
                      </span>
                    </td>
                    <td className="p-4 text-gray-500 truncate max-w-xs" title={token.description}>
                      {token.description}
                    </td>
                    <td className="p-4 text-center">
                       <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                        token.status === 0
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-red-50 text-red-700 border-red-200"
                      }`}>
                        {token.status === 0 ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleEditToken(token)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                          title="Edit Token"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                      </div>
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

export default AdminTokensDetails;