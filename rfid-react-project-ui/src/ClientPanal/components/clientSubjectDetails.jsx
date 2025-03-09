import React, { useState, useEffect } from 'react';
import { getClientSubjectDetails } from '../service/api';

const ClientSubjectDetail = ({ ct_id, subject_name }) => {
  const [subjectDetails, setSubjectDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <button
        className="absolute top-15 right-15 px-4 py-2 bg-blue-500 text-white rounded-full"
        onClick={() => alert('User button clicked')} // Example action on click
      >
        User
      </button>
      <p className="mt-4">
        <strong>{subject_name}</strong>
      </p>

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
    </div>
  );
};

export default ClientSubjectDetail;
