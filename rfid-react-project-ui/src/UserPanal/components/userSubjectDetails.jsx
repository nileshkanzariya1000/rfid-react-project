import React, { useState, useEffect } from 'react';
import { getUserSubjectDetails } from '../service/api';  
import { Link } from "react-router-dom";
import { Outlet,useParams } from "react-router-dom";

const UserSubjectDetail = ({ ct_id }) => {
  const [subjectDetails, setSubjectDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {  subjectName } = useParams();
 

  useEffect(() => {
    const fetchSubjectDetails = async () => {
      try {
        const data = await getUserSubjectDetails(ct_id); // Fetch subject details based on ct_id
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
     <Link to={`ViewAttendanceForUser/${encodeURIComponent(ct_id)}`}>
                 <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-green-600">
                   Attendance
                 </button>
               </Link>
     
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Subject Details</h3>
          <table className="min-w-full table-auto mt-4 border-collapse">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left font-semibold">Attribute</th>
                <th className="px-4 py-2 text-left font-semibold">Value</th>
              </tr>
            </thead>
            <tbody>
            <tr className="border-b">
                <td className="px-4 py-2 font-semibold">Ct_id</td>
                <td className="px-4 py-2 text-green-500">{ct_id}</td>
              </tr>
            <tr className="border-b">
                <td className="px-4 py-2 font-semibold">Subaject Name</td>
                <td className="px-4 py-2 text-green-500">{subjectName}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-semibold">Designation</td>
                <td className="px-4 py-2 text-green-500">{subjectDetails.designation}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-semibold">RFID</td>
                <td className="px-4 py-2">{subjectDetails.rfid}</td>
              </tr>
              
            </tbody>
          </table>
        </div>
      

    
     
    </div>
  );
};

export default UserSubjectDetail;
