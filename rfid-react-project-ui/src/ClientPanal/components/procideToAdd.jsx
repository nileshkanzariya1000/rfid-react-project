import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTokenById } from '../service/api';
import { addNewSubject } from '../service/api';
const ProcideToAdd = () => {
  const { token_id } = useParams();
  const [tokenDetails, setTokenDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subjectName, setSubjectName] = useState('');
  const [passKey, setPassKey] = useState('');

  useEffect(() => {
    const fetchTokenDetails = async () => {
      try {
        setLoading(true);

        const data = await getTokenById(token_id);
        setTokenDetails(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Generate a random pass key
    const generatePassKey = () => {
      return Math.random().toString(36).substr(2, 10).toUpperCase();
    };

    setPassKey(generatePassKey());
    fetchTokenDetails();
  }, [token_id]);

 const handleSubmit = async (event) => {
  event.preventDefault();

  if (!tokenDetails) {
    console.error("Token details not available");
    return;
  }

  const purchaseDate = new Date();
  const durationDays = tokenDetails.duration_day || 0; // Assuming the API returns duration in days
  const expireDate = new Date();
  expireDate.setDate(purchaseDate.getDate() + durationDays);

  const formattedPurchaseDate = purchaseDate.toISOString().split('T')[0];
  const formattedExpireDate = expireDate.toISOString().split('T')[0];
 const status=1;
  try {
    const response = await addNewSubject(
      token_id,
      passKey,
      status, // Assuming the status is 'active' when purchased
      formattedPurchaseDate,
      formattedExpireDate,
      subjectName
    );

    if (response.success) {
      alert("Subject added successfully!");
    } else {
      alert(response.message || "Failed to add subject.");
    }
  } catch (error) {
    console.error("Error adding subject:", error.message);
    alert("Something went wrong. Please try again.");
  }
};

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg text-center">
      <h1 className="text-2xl font-bold mb-2">Buy Token</h1>
      <p className="text-lg text-green-600 font-semibold">Price: ₹{tokenDetails?.price || 'N/A'}</p>
      <p className="text-lg text-green-600 font-semibold">token:{tokenDetails?.name || 'N/A'}</p>
      
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div className="text-left">
          <label className="block font-semibold">Pass Key:</label>
          <input 
            type="text" 
            value={passKey} 
            readOnly 
            className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed" 
          />
        </div>

        <div className="text-left">
          <label className="block font-semibold">Subject Name:</label>
          <input 
            type="text" 
            value={subjectName} 
            onChange={(e) => setSubjectName(e.target.value)}
            required
            className="w-full p-2 border rounded" 
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Proceed to Payment
        </button>
      </form>
      
      <p className="mt-4 text-gray-500">Fill in the details to purchase your token.</p>
    </div>
  );
};

export default ProcideToAdd;