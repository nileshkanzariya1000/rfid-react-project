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
       // Dynamically add Razorpay script to the document head
       const script = document.createElement('script');
       script.src = "https://checkout.razorpay.com/v1/checkout.js";
       script.onload = () => {
         console.log('Razorpay script loaded');
       };
       script.onerror = () => {
         console.error('Failed to load Razorpay script');
       };
       document.body.appendChild(script);
   
       // Clean up the script on component unmount
       return () => {
         document.body.removeChild(script);
       };
  }, [token_id]);

  const handlePayment = () => {
    if (!window.Razorpay) {
      console.error("Razorpay is not loaded properly.");
      return;
    }

    const options = {
      key: 'rzp_test_YwZhdfMsPm2X45', // Replace with your Razorpay key
      amount: tokenDetails.price * 100, // Amount in paise (1 INR = 100 paise)
      currency: 'INR',
      name: 'Token Purchase',
      description: 'Purchase of token for subject',
      image: 'your_logo_url', // Optional
      prefill: {
        name: 'Your Name',
        email: 'your_email@example.com',
        contact: 'your_contact_number',
      },
      theme: {
        color: '#528FF0',
      },
      handler: async (response) => {
        try {
          setPaymentLoading(true);
          setPaymentError(null); // Clear previous errors

          // Call the API to update the token only after successful payment
          const updateResponse = await updateTokenForClient(ct_id, token_id);
          
          if (updateResponse.success) {
            alert("Token successfully updated!");
            window.location.href = '../../../'; // Redirect to the appropriate page after success
          } else {
            setPaymentError('Failed to update token. Please try again later.');
          }
        } catch (error) {
          console.error("Payment or token update failed:", error.message);
          setPaymentError('Something went wrong while processing the payment or updating the token.');
        } finally {
          setPaymentLoading(false); // Hide loading spinner after API call
        }
      },
      modal: {
        ondismiss: () => {
          alert('Payment process was cancelled');
        },
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
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
        onClick={handlePayment} // Trigger the payment process on button click
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        disabled={paymentLoading} // Disable button while payment is in progress
      >
        {paymentLoading ? 'Processing...' : 'Proceed to Payment'}
      </button>

      <p className="mt-4 text-gray-500">Click to proceed to payment for your token.</p>
    </div>
  );
};

export default ProcideToUpdate;
