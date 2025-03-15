import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  getTokensForAdmin,
  editTokenDetails,
  toggleTokenStatus,
  addNewToken,
} from "../service/api";
import { Search, Edit, Check, PlusCircle, X } from "lucide-react";

const AdminTokensDetails = () => {
  const [tokens, setTokens] = useState([]);
  const [filteredTokens, setFilteredTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newToken, setNewToken] = useState({
    name: "",
    price: "",
    duration_day: "",
    description: "",
  });
  const [editingToken, setEditingToken] = useState(null);
  const navigate = useNavigate(); // Initialize navigate


  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await getTokensForAdmin();
        if (response?.success && Array.isArray(response.data)) {
          const sortedTokens = response.data.sort(
            (a, b) => a.token_id - b.token_id
          );
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

  useEffect(() => {
    setFilteredTokens(
      tokens.filter((token) =>
        `${token.name} ${token.description}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, tokens]);

  const handleAddNewToken = async () => {
    try {
      const response = await editTokenDetails(newToken);
      if (response?.success) {
        const updatedTokens = [...tokens, response.data];
        setTokens(updatedTokens);
        setFilteredTokens(updatedTokens);
        setNewToken({ name: "", price: "", duration_day: "", description: "" });
        setShowPopup(false);
      } else {
        alert("Failed to add new token");
      }
    } catch (err) {
      alert("Error adding new token: " + (err.message || "Unknown error"));
    }
  };

  const handleAddToken = async () => {
    try {
      const response = await addNewToken(newToken);
      if (response?.success) {
        setTokens([...tokens, response.data]);
        setFilteredTokens([...tokens, response.data]);
        setShowModal(false);
        setNewToken({ name: "", price: "", duration_day: "", description: "" });
        navigate(0);
      } else {
        alert("Failed to add token");
      }
    } catch (err) {
      alert("Error adding token: " + (err.message || "Unknown error"));
    }
  };

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
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Manage Tokens
      </h2>

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
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white p-3 rounded-lg flex items-center gap-2"
        >
          <PlusCircle /> Add Token
        </button>
      </div>

      {/* Existing Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Add New Token</h3>
              <button
                onClick={() => setShowPopup(false)}
                className="text-gray-600"
              >
                <X />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {Object.keys(newToken).map((key) => (
                <input
                  key={key}
                  type={
                    key === "price" || key === "duration_day"
                      ? "number"
                      : "text"
                  }
                  placeholder={key.replace("_", " ").toUpperCase()}
                  value={newToken[key]}
                  onChange={(e) =>
                    setNewToken({ ...newToken, [key]: e.target.value })
                  }
                  className="border p-2 rounded"
                />
              ))}
              <button
                onClick={handleAddNewToken}
                className="bg-blue-500 text-white p-2 rounded flex items-center justify-center gap-2"
              >
                <PlusCircle /> Add Token
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Modal for addNewToken function */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Add New Token</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-600"
              >
                <X />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {Object.keys(newToken).map((key) => (
                <input
                  key={key}
                  type={
                    key === "price" || key === "duration_day"
                      ? "number"
                      : "text"
                  }
                  placeholder={key.replace("_", " ").toUpperCase()}
                  value={newToken[key]}
                  onChange={(e) =>
                    setNewToken({ ...newToken, [key]: e.target.value })
                  }
                  className="border p-2 rounded"
                />
              ))}
              <button
                onClick={handleAddToken}
                className="bg-blue-500 text-white p-2 rounded flex items-center justify-center gap-2"
              >
                <PlusCircle /> Add Token
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Token Modal */}
      {showEditModal && editingToken && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Edit Token</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-600"
              >
                <X />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <input
                type="text"
                placeholder="NAME"
                value={editingToken.name}
                onChange={(e) =>
                  setEditingToken({ ...editingToken, name: e.target.value })
                }
                className="border p-2 rounded"
              />
              <input
                type="number"
                placeholder="PRICE"
                value={editingToken.price}
                onChange={(e) =>
                  setEditingToken({ ...editingToken, price: e.target.value })
                }
                className="border p-2 rounded"
              />
              <input
                type="number"
                placeholder="DURATION DAY"
                value={editingToken.duration_day}
                onChange={(e) =>
                  setEditingToken({
                    ...editingToken,
                    duration_day: e.target.value,
                  })
                }
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="DESCRIPTION"
                value={editingToken.description}
                onChange={(e) =>
                  setEditingToken({
                    ...editingToken,
                    description: e.target.value,
                  })
                }
                className="border p-2 rounded"
              />
              {/* Dropdown for Status */}
              <select
                value={editingToken.status}
                onChange={(e) =>
                  setEditingToken({
                    ...editingToken,
                    status: parseInt(e.target.value),
                  })
                }
                className="border p-2 rounded"
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
              <button
                onClick={handleUpdateToken}
                className="bg-green-500 text-white p-2 rounded flex items-center justify-center gap-2"
              >
                <Check /> Update Token
              </button>
            </div>
          </div>
        </div>
      )}
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
                  <td className="p-3">{token.name}</td>
                  <td className="p-3">${parseFloat(token.price).toFixed(2)}</td>
                  <td className="p-3">{token.duration_day} days</td>
                  <td className="p-3">{token.description}</td>
                  <td className="p-3">
                    <button
                      className={`px-3 py-1 rounded text-white ${
                        token.status === 1 ? "bg-green-500" : "bg-red-500"
                      }`}
                      onClick={() =>
                        toggleTokenStatus(token.token_id, token.status)
                      }
                    >
                      {token.status === 1 ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="p-3">
                    <button
                      className="p-2 bg-blue-500 text-white rounded-full"
                      onClick={() => handleEditToken(token)}
                    >
                      <Edit size={16} />
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

export default AdminTokensDetails;
