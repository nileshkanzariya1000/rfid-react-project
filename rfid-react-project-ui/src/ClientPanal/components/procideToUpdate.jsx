import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTokenById } from '../service/api';
import { updateTokenForClient } from '../service/api'; // Import the API function

const ProcideToUpdate = () => {
  const { token_id, ct_id } = useParams();
  const [tokenDetails, setTokenDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false); // Loading state for payment action
  const [paymentError, setPaymentError] = useState(null); // State to hold payment error messages

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
    fetchTokenDetails();
  }, [token_id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setPaymentLoading(true); // Show loading spinner while making API call
      setPaymentError(null); // Clear previous errors

      const response = await updateTokenForClient(ct_id, token_id);
      
      if (response.success) {
        alert(response.message);
        window.location.href = '../../../';
       
      } else {
        
        setPaymentError('Failed to update token. Please try again later.');
      }
    } catch (err) {
      // Catch any errors thrown by the API call
      setPaymentError('Something went wrong while processing the payment. Please try again later.');
    } finally {
      setPaymentLoading(false); // Hide loading spinner after API call
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg text-center">
      <h1 className="text-2xl font-bold mb-2">Proceed to Payment</h1>
      <p className="text-lg text-green-600 font-semibold">Price: ₹{tokenDetails?.price || 'N/A'}</p>
      <p className="text-lg text-green-600 font-semibold">Token Name: {tokenDetails?.name || 'N/A'}</p>
      <p className="text-lg text-green-600 font-semibold">Duration: {tokenDetails?.duration_day || 'N/A'} days</p>

      {paymentError && (
        <div className="text-red-600 font-semibold mt-4">
          <p>{paymentError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          disabled={paymentLoading} // Disable button while loading
        >
          {paymentLoading ? 'Processing...' : 'Proceed to Payment'}
        </button>
      </form>

      <p className="mt-4 text-gray-500">Click to proceed to payment for your token.</p>
    </div>
  );
};

export default ProcideToUpdate;
