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

  // Function to handle Razorpay payment
  const handlePayment = () => {
    if (!tokenDetails) {
      console.error("Token details are not available");
      return;
    }
  
    if (window.Razorpay) {
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
            const purchaseDate = new Date();
            const durationDays = tokenDetails.duration_day || 0;
            const expireDate = new Date();
            expireDate.setDate(purchaseDate.getDate() + durationDays);
  
            const formattedPurchaseDate = purchaseDate.toISOString().split('T')[0];
            const formattedExpireDate = expireDate.toISOString().split('T')[0];
            const status = 1;
  
            // Proceed with adding the subject to your system after successful payment
            const addSubjectResponse = await addNewSubject(
              token_id,
              passKey,
              status,
              formattedPurchaseDate,
              formattedExpireDate,
              subjectName
            );
  
            if (addSubjectResponse.success) {
              alert("Subject added successfully!");
              window.location.href="../../";
            } else {
              alert(addSubjectResponse.message || "Failed to add subject.");
            }
          } catch (error) {
            console.error("Error adding subject:", error.message);
            alert("Something went wrong. Please try again.");
          }
        },
        modal: {
          ondismiss: () => {
            alert('Payment process was cancelled');
          },
        },
        // Optional: Listen for payment failure
        payment_failed: (response) => {
          console.error('Payment failed', response);
          alert('Payment failed! Please try again.');
        },
      };
  
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } else {
      console.error('Razorpay is not loaded');
      alert('Razorpay is not loaded. Please try again.');
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    handlePayment(); // Trigger payment process
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
