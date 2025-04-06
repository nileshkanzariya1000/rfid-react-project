import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTokenById } from '../service/api';
import { initiateUpdateRazorpayPayment } from '../service/api';

const ProcideToUpdate = () => {
  const { token_id, ct_id } = useParams();
  const [tokenDetails, setTokenDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

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

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => console.log('Razorpay script loaded');
    script.onerror = () => console.error('Failed to load Razorpay script');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [token_id]);

  const handlePayment = () => {
    setPaymentLoading(true);
    setPaymentError(null);

    initiateUpdateRazorpayPayment({
      tokenDetails,
      clientId: ct_id,
      tokenId: token_id,
      onSuccess: (successMessage) => {
        alert(successMessage || 'Token successfully updated!');
        window.location.href = '../../../';
      },
      onFailure: (message) => {
        setPaymentError(message);
        setPaymentLoading(false);
      },
    });
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

      <button
        onClick={handlePayment}
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        disabled={paymentLoading}
      >
        {paymentLoading ? 'Processing...' : 'Proceed to Payment'}
      </button>

      <p className="mt-4 text-gray-500">Click to proceed to payment for your token.</p>
    </div>
  );
};

export default ProcideToUpdate;
