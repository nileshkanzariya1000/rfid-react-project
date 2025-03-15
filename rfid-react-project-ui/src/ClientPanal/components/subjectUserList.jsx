import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserWhichInSubject } from '../service/api';
import { editUserInSubject } from '../service/api';
import { addUserInSubject } from '../service/api';
import { deleteUserFromSubject } from '../service/api';
const SubjectUserList = () => {
  const { ct_id } = useParams(); // Access ct_id from URL params
  const decodedCtId = decodeURIComponent(ct_id); // Decode the ct_id if it was encoded

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
const [userToDelete, setUserToDelete] = useState(null);
  // Edit modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Add user modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    user_id: '',
    designation: '',
    rfid: ''
  });

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const data = await getUserWhichInSubject(decodedCtId);
        if (data.success) {
          setUsers(data.data); // Set the user data if successful
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false); // Set loading to false after the fetch is complete
      }
    };

    fetchUserList();
  }, [decodedCtId]);

  const handleEdit = (userId) => {
    const userToEdit = users.find((user) => user.user_id === userId);
    setSelectedUser(userToEdit);
    setIsEditModalOpen(true);
  };

  const handleDelete = (userId) => {
    setUserToDelete(userId);
    setIsConfirmDeleteModalOpen(true);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const result = await editUserInSubject(
        decodedCtId,
        selectedUser.designation,
        selectedUser.user_id,
        selectedUser.rfid
      );

      if (result.success) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.user_id === selectedUser.user_id
              ? { ...user, designation: selectedUser.designation, rfid: selectedUser.rfid }
              : user
          )
        );
        setIsEditModalOpen(false);
      } else {
        setError('Failed to save changes');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  const handleAddUser = async () => {
    try {
      const result = await addUserInSubject(
        newUser.user_id,
        decodedCtId,
        newUser.designation,
        newUser.rfid
      );

      if (result.success) {
        
        setIsAddModalOpen(false);
        window.location.reload();
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setIsAddModalOpen(false);
  };

 

  return (
    <div className="container mx-auto p-1">
      {/* Header and Add User Button */}
      <div className="flex justify-between items-center p-4">
        <h1 className="text-xl font-semibold">User List</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add User
        </button>
      </div>
  
      {/* Error and Loading Message */}
      {loading && (
        <div className="text-center text-lg text-gray-500">Loading...</div>
      )}
      {error && (
        <div className="text-center text-lg text-red-600">Error: {error}</div>
      )}
  
      {/* Table */}
      {!loading && !error && (
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="py-3 px-6 text-left font-medium">Name</th>
                <th className="py-3 px-6 text-left font-medium">Designation</th>
                <th className="py-3 px-6 text-left font-medium">Email</th>
                <th className="py-3 px-6 text-left font-medium">Mobile</th>
                <th className="py-3 px-6 text-left font-medium">RFID</th>
                <th className="py-3 px-6 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {users.map((user) => (
                <tr key={user.user_id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6">{user.name}</td>
                  <td className="py-3 px-6">{user.designation}</td>
                  <td className="py-3 px-6">{user.email}</td>
                  <td className="py-3 px-6">{user.mobile}</td>
                  <td className="py-3 px-6">{user.rfid}</td>
                  <td className="py-3 px-6 flex space-x-3">
                    <button
                      onClick={() => handleEdit(user.user_id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.user_id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
  
      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Add User</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label className="block text-gray-700">User ID</label>
                <input
                  type="text"
                  name="user_id"
                  value={newUser.user_id}
                  onChange={handleAddInputChange}
                  className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Designation</label>
                <input
                  type="text"
                  name="designation"
                  value={newUser.designation}
                  onChange={handleAddInputChange}
                  className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">RFID</label>
                <input
                  type="text"
                  name="rfid"
                  value={newUser.rfid}
                  onChange={handleAddInputChange}
                  className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleCloseModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddUser}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
  
      {/* Edit Modal */}
      {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Edit User</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label className="block text-gray-700">Designation</label>
                <input
                  type="text"
                  name="designation"
                  value={selectedUser.designation}
                  onChange={handleInputChange}
                  className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">RFID</label>
                <input
                  type="text"
                  name="rfid"
                  value={selectedUser.rfid}
                  onChange={handleInputChange}
                  className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleCloseModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
  
      {/* Confirmation Modal */}
      {isConfirmDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete this user?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsConfirmDeleteModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  const result = await deleteUserFromSubject(userToDelete, decodedCtId);
                  if (result.success) {
                    setUsers((prevUsers) => prevUsers.filter((user) => user.user_id !== userToDelete));
                    setIsConfirmDeleteModalOpen(false);
                  } else {
                    setError('Failed to delete user');
                  }
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectUserList;
