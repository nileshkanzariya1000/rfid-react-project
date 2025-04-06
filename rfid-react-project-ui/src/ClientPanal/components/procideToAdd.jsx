import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTokenById } from '../service/api';
import { initiateRazorpayPayment } from '../service/api'; // Razorpay handler

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

    // Generate random pass key
    const generatePassKey = () => {
      return Math.random().toString(36).substr(2, 10).toUpperCase();
    };

    setPassKey(generatePassKey());
    fetchTokenDetails();

    // Load Razorpay script
    const script = document.createElement('script');
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      console.log('Razorpay script loaded');
    };
    script.onerror = () => {
      console.error('Failed to load Razorpay script');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [token_id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const message = await initiateRazorpayPayment({
        tokenDetails,
        passKey,
        subjectName,
        token_id
      });

      alert(message);
      window.location.href = "../../";
    } catch (err) {
      console.error("Error:", err);
      alert(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg text-center">
      <h1 className="text-2xl font-bold mb-2">Buy Token</h1>
      <p className="text-lg text-green-600 font-semibold">Price: ₹{tokenDetails?.price || 'N/A'}</p>
      <p className="text-lg text-green-600 font-semibold">Token: {tokenDetails?.name || 'N/A'}</p>

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
