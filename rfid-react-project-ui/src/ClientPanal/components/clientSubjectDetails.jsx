import React, { useState, useEffect } from 'react';
import { getClientSubjectDetails } from '../service/api';
import { Link } from "react-router-dom";
import { Outlet, useLocation } from "react-router-dom";

const ClientSubjectDetail = ({ ct_id, subject_name }) => {
  const [subjectDetails, setSubjectDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Check if Outlet is showing
  const isOutletShown = location.pathname.includes('SubjectUserList');

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!subjectDetails) {
    return <p>No subject details available</p>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      {/* Show this button only when not in 'SubjectUserList' path */}
      {!isOutletShown && (
         <div className="flex justify-between items-center p-4">
        <h1 className="text-xl font-semibold">{subject_name}</h1>
        <Link to={`SubjectUserList/${encodeURIComponent(ct_id)}`}>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Users
        </button>
      </Link>
      </div>
      
      )}

      {/* Conditionally render the subject details */}
      {!isOutletShown && (
        <>
          

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
                  <td className="px-4 py-2">{subjectDetails.pass_key}</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold">Purchase Date</td>
                  <td className="px-4 py-2">{subjectDetails.purchase_date}</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold">Expire Date</td>
                  <td className="px-4 py-2">{subjectDetails.expire_date}</td>
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
        </>
      )}

      {/* Render Outlet for nested routes */}
      <Outlet />
    </div>
  );
};

export default ClientSubjectDetail;
