import React, { useState, useEffect } from 'react';
import { getClientSubjectDetails, editedSubject } from '../service/api';  // Import editedSubject API function
import { Link } from "react-router-dom";
import { Outlet, useLocation } from "react-router-dom";

const ClientSubjectDetail = ({ ct_id, subject_name }) => {
  const [subjectDetails, setSubjectDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedSubjectName, setEditedSubjectName] = useState(subject_name);
  const [isSaving, setIsSaving] = useState(false);  // State to handle saving process

  const location = useLocation(); // Get current location to check the route

  useEffect(() => {
    const fetchSubjectDetails = async () => {
      try {
        const data = await getClientSubjectDetails(ct_id); // Fetch subject details based on ct_id
        setSubjectDetails(data.data[0]); // Assuming the API returns an array inside data
      } catch (error) {
        setError(error.message); // Set the error message if something goes wrong
      } finally {
        setLoading(false); // Stop loading once the request is complete
      }
    };

    fetchSubjectDetails();
  }, [ct_id]); // Re-fetch data when ct_id changes

  // Update the editedSubjectName whenever subject_name prop changes
  useEffect(() => {
    setEditedSubjectName(subject_name);
  }, [subject_name]);

  // Check if Outlet is showing
  const isOutletShown = location.pathname.includes('SubjectUserList') || location.pathname.includes('UpdateTokenForClient') || location.pathname.includes('ViewAttendanceBySubject');

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!subjectDetails) {
    return <p>No subject details available</p>;
  }

  const handleEditSubject = () => {
    setIsEditModalOpen(true);
  };

  const handleSubjectNameChange = (e) => {
    setEditedSubjectName(e.target.value);
  };

  const handleSaveSubjectName = async () => {
    setIsSaving(true);  // Set saving state to true

    try {
      const result = await editedSubject(editedSubjectName, ct_id);  // Call the editedSubject API function
      if (result.success) {
        // Successfully updated the subject name
        setSubjectDetails(prevDetails => ({ ...prevDetails, name: editedSubjectName }));
        setIsEditModalOpen(false);  // Close the modal after saving
        window.location.href = '../../';
      } else {
        setError('Failed to update subject name. Please try again.');
      }
    } catch (error) {
      setError(error.message || 'Something went wrong');
    } finally {
      setIsSaving(false);  // Set saving state back to false
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      {/* Show this button only when not in 'SubjectUserList' path */}
      {!isOutletShown && (
        <div className="flex justify-between items-center p-4">
          <h1 className="text-xl font-semibold">{subject_name}</h1>
          <Link to={`SubjectUserList/${encodeURIComponent(ct_id)}`}>
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Users
            </button>
          </Link>
          <Link to={`UpdateTokenForClient/${encodeURIComponent(ct_id)}`}>
            <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-green-600">
              Upade token
            </button>
          </Link>
          <button 
            onClick={handleEditSubject}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit Subject
          </button>
          <Link to={`ViewAttendanceBySubject/${encodeURIComponent(ct_id)}`}>
            <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-green-600">
              Attendance
            </button>
          </Link>
        </div>
      )}

      {/* Conditionally render the subject details */}
      {!isOutletShown && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Token Details</h3>
          <table className="min-w-full table-auto mt-4 border-collapse">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left font-semibold">Attribute</th>
                <th className="px-4 py-2 text-left font-semibold">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2 font-semibold">Pass Key</td>
                <td className="px-4 py-2 text-green-500">{subjectDetails.pass_key}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-semibold">Purchase Date</td>
                <td className="px-4 py-2">{subjectDetails.purchase_date}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-semibold">Expire Date</td>
                <td className="px-4 py-2 font-bold text-red-500">{subjectDetails.expire_date}</td>

              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-semibold">Price</td>
                <td className="px-4 py-2">${subjectDetails.price}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-semibold">Duration (Days)</td>
                <td className="px-4 py-2">{subjectDetails.duration_day} days</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-semibold">Description</td>
                <td className="px-4 py-2">{subjectDetails.description}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-semibold">Token Name</td>
                <td className="px-4 py-2">{subjectDetails.name}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Render Outlet for nested routes */}
      <Outlet />

      {/* Edit Subject Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Edit Subject Name</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label className="block text-gray-700">Subject Name</label>
                <input
                  type="text"
                  value={editedSubjectName}
                  onChange={handleSubjectNameChange}
                  className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveSubjectName}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  disabled={isSaving}  // Disable the button while saving
                >
                  {isSaving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientSubjectDetail;
