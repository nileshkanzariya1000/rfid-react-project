import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { getUserSubjectDetails } from '../service/api';

const UserSubjectDetail = ({ ct_id, subject_name }) => {
  const [subjectDetails, setSubjectDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userData = Cookies.get("user_data");
  if (!userData) throw new Error("User not logged in");

  const { user_id } = JSON.parse(userData);

  useEffect(() => {
    const fetchSubjectDetails = async () => {
      try {
        const data = await getUserSubjectDetails(user_id, ct_id);
        setSubjectDetails(data?.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (ct_id) fetchSubjectDetails();
  }, [ct_id]);

  if (loading) return <p>Loading subject details...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Subject Details</h2>
      <table className="min-w-full border border-gray-300">
        <tbody>
          <tr className="border-b border-gray-300">
            <td className="p-2 font-bold">Subject Name</td>
            <td className="p-2">{subject_name}</td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="p-2 font-bold">Subject ID (ct_id)</td>
            <td className="p-2">{ct_id}</td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="p-2 font-bold">User ID</td>
            <td className="p-2">{user_id}</td>
          </tr>
          {subjectDetails.length > 0 &&
            Object.entries(subjectDetails[0]).map(([key, value]) => (
              <tr key={key} className="border-b border-gray-300">
                <td className="p-2 font-bold capitalize">{key.replace(/_/g, ' ')}</td>
                <td className="p-2">{value}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {subjectDetails.length === 0 && <p className="mt-4">No details available</p>}
    </div>
  );
};

export default UserSubjectDetail;