import config from '../../config';
import Cookies from 'js-cookie';


export const login = async (email, password) => {
  try {
    const response = await fetch(`${config.baseURL}/clientLogin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (response.ok) {
      // Store client details in cookies (optional)
      Cookies.set('client_data', JSON.stringify(data.client), { expires: 1 });

      return data;  // Return success response
    } else {
      throw new Error(data.message || 'Login failed');
    }
  } catch (error) {
    throw new Error(error.message || 'Something went wrong');
  }
};

export const register = async (name, email, password, mobile) => {
  try {
    const response = await fetch(`${config.baseURL}/clientRegister`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, mobile }),
    });

    const data = await response.json();
    if (response.ok) {
      return data;  // Return the full data from the API (success or error message, etc.)
    } else {
      throw new Error(data.message || 'Registration failed');
    }
  } catch (error) {
    throw new Error(error.message || 'Something went wrong');
  }
};

export const updateClient = async (client_id, name, email, mobile) => {
  try {
    const response = await fetch(`${config.baseURL}/clientUpdate`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ client_id, name, email, mobile }),
    });

    

    const data = await response.json();
    if (!response.ok) {
      return data;
    }
    Cookies.set(
      'client_data',
      JSON.stringify({
        "client_id": client_id,
        "client_name": name,
        "client_email": email,
        "client_mobile": mobile,
      }),
      { expires: 1 }
    );

    return data;
  } catch (error) {
    throw new Error(error.message || 'Something went wrong');
  }
};

export const updateClientPassword = async (client_id, current_password, new_password) => {
  try {
      const response = await fetch(`${config.baseURL}/clientChangePassword`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ client_id, current_password, new_password }),
      });

      const data = await response.json();
      if (response.ok) {
          return data;  // Return success response from API
      } else {
          return data;
      }
  } catch (error) {
      throw new Error(error.message || 'Something went wrong');
  }
};

export const getClientSubjects = async () => {
  try {
    const clientData = Cookies.get("client_data");
    if (!clientData) throw new Error("Client not logged in");

    const { client_id } = JSON.parse(clientData);
    const response = await fetch(`${config.baseURL}/getClientSubjects?client_id=${client_id}`, {
      method: "GET", // Use GET if it's just fetching data
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      return data; // Return full response (success + data)
    } else {
      throw new Error(data.message || "Failed to fetch subjects");
    }
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const getClientSubjectDetails = async (ct_id) => {
  try {
    const response = await fetch(`${config.baseURL}/getClientSubjectDetails?ct_id=${ct_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      return data;  // Return full response with subject details
    } else {
      throw new Error(data.message || 'Failed to fetch subject details');
    }
  } catch (error) {
    throw new Error(error.message || 'Something went wrong');
  }
};

export const getUserWhichInSubject = async (ct_id) => {
  try {
    const response = await fetch(`${config.baseURL}/getUserWhichInSubject?ct_id=${ct_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      return data;  // Return full response with user details in the subject
    } else {
      return data;
    }
  } catch (error) {
    throw new Error(error.message || 'Something went wrong');
  }
};

export const editUserInSubject = async (ct_id, designation, user_id,rfid) => {
  try {
      const response = await fetch(`${config.baseURL}/editUserInsubject`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ct_id, designation, user_id,rfid }),
      });

      const data = await response.json();
      if (response.ok) {
          return data;  // Return success response from API
      } else {
          return data;
      }
  } catch (error) {
      throw new Error(error.message || 'Something went wrong');
  }
};

export const addUserInSubject = async (user_id,ct_id,designation,rfid) => {
  try {
    const clientData = Cookies.get("client_data");
    if (!clientData) throw new Error("Client not logged in");
    const { client_id } = JSON.parse(clientData);

      const response = await fetch(`${config.baseURL}/addUserSubject`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id, client_id, ct_id,designation,rfid}),
      });

      const data = await response.json();
      if (response.ok) {
          return data;  // Return success response from API
      } else {
          return data;
      }
  } catch (error) {
      throw new Error(error.message || 'Something went wrong');
  }
};

export const deleteUserFromSubject = async (user_id, ct_id) => {
  try {
    const clientData = Cookies.get("client_data");
    if (!clientData) throw new Error("Client not logged in");
    const { client_id } = JSON.parse(clientData);

    const response = await fetch(`${config.baseURL}/deleteUserFromSubject`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id, client_id, ct_id }),
    });

    const data = await response.json();
    if (response.ok) {
      return data;  // Return success response from API
    } else {
      return data;
    }
  } catch (error) {
    throw new Error(error.message || 'Something went wrong');
  }
};

export const editedSubject = async (subject_name,ct_id) => {
  try {
    const clientData = Cookies.get("client_data");
    if (!clientData) throw new Error("Client not logged in");
    const { client_id } = JSON.parse(clientData);

      const response = await fetch(`${config.baseURL}/editSubject`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ subject_name, client_id, ct_id}),
      });

      const data = await response.json();
      if (response.ok) {
          return data;  // Return success response from API
      } else {
          return data;
      }
  } catch (error) {
      throw new Error(error.message || 'Something went wrong');
  }
};

export const getTokensForClient = async () => {
  try {
    

      const response = await fetch(`${config.baseURL}/getTokensForClient`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          }
      });

      const data = await response.json();
      if (response.ok) {
          return data;  // Return success response from API
      } else {
          return data;
      }
  } catch (error) {
      throw new Error(error.message || 'Something went wrong');
  }
};

export const getTokenById = async (token_id) => {
  try {
    const response = await fetch(`${config.baseURL}/getTokenById?token_id=${token_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      return data;  // Return full response with user details in the subject
    } else {
      throw new Error(data.message || 'Failed to fetch user details for subject');
    }
  } catch (error) {
    throw new Error(error.message || 'Something went wrong');
  }
};

export const addNewSubject = async (token_id, pass_key, status, purchase_date, expire_date ,subject_name) => {
  try {
    const clientData = Cookies.get("client_data");
    if (!clientData) throw new Error("Client not logged in");
    const { client_id } = JSON.parse(clientData);

      const response = await fetch(`${config.baseURL}/addNewSubject`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token_id, pass_key, status, purchase_date, expire_date ,subject_name,client_id}),
      });

      const data = await response.json();
      if (response.ok) {
          return data;  // Return success response from API
      } else {
          return data;
      }
  } catch (error) {
      throw new Error(error.message || 'Something went wrong');
  }
};

export const updateTokenForClient = async (ct_id, token_id) => {
  try {
      const response = await fetch(`${config.baseURL}/updateToken`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ct_id, token_id}),
      });

      const data = await response.json();
      if (response.ok) {
          return data;  // Return success response from API
      } else {
          return data;
      }
  } catch (error) {
      throw new Error(error.message || 'Something went wrong');
  }
};

export const getPunchRecordBySubject = async (ct_id,from_date,to_date) => {
  try {
   
    const response = await fetch(`${config.baseURL}/getPunchRecordBySubject?ct_id=${ct_id}&from_date=${from_date}&to_date=${to_date}`, {
      method: "GET", // Use GET if it's just fetching data
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      return data; // Return full response (success + data)
    } else {
      return data;
    }
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const initiateRazorpayPayment = async ({ tokenDetails, passKey, subjectName, token_id }) => {
  return new Promise((resolve, reject) => {
    if (!window.Razorpay) {
      alert('Razorpay is not loaded. Please try again.');
      return reject('Razorpay not loaded');
    }

    // Try to get client details from cookies for the prefill
    let clientName = 'Your Name';
    let clientEmail = 'your_email@example.com';
    let clientContact = 'your_contact_number';
    
    try {
      const clientData = Cookies.get("client_data");
      if (clientData) {
        const parsed = JSON.parse(clientData);
        if (parsed.client_name) clientName = parsed.client_name;
        if (parsed.client_email) clientEmail = parsed.client_email;
        if (parsed.client_mobile) clientContact = parsed.client_mobile;
      }
    } catch (e) {
      console.warn("Could not parse client cookies for prefill");
    }

    const options = {
      key: 'rzp_test_YwZhdfMsPm2X45', // Replace with your real Razorpay key
      amount: tokenDetails.price * 100, // in paise
      currency: 'INR',
      name: 'Token Purchase',
      description: 'Purchase of token for subject',
      image: 'your_logo_url', // Optional logo
      prefill: {
        name: clientName,
        email: clientEmail,
        contact: clientContact,
      },
      theme: {
        color: '#00c950', // Updated to match brand color
      },
      handler: async (response) => {
        try {
          const purchaseDate = new Date();
          const durationDays = tokenDetails.duration_day || 0;
          const expireDate = new Date();
          expireDate.setDate(purchaseDate.getDate() + durationDays);

          const formattedPurchaseDate = purchaseDate.toISOString().split('T')[0];
          const formattedExpireDate = expireDate.toISOString().split('T')[0];
          const status = 0;

          // ✅ Call addNewSubject here
          // client_id is extracted manually via Cookies inside addNewSubject
          const result = await addNewSubject(
            token_id,
            passKey,
            status,
            formattedPurchaseDate,
            formattedExpireDate,
            subjectName
          );

          if (result.success) {
            resolve('Subject added successfully!');
          } else {
            reject(result.message || 'Failed to add subject.');
          }
        } catch (error) {
          reject(error.message || 'Something went wrong.');
        }
      },
      modal: {
        ondismiss: () => {
          reject('Payment process was cancelled');
        },
      },
      payment_failed: (response) => {
        reject('Payment failed');
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  });
};


export const initiateUpdateRazorpayPayment = async ({
  tokenDetails,
  clientId,
  tokenId,
  onSuccess,
  onFailure,
}) => {
  if (!window.Razorpay) {
    console.error("Razorpay is not loaded properly.");
    onFailure("Payment gateway not loaded.");
    return;
  }

  const options = {
    key: 'rzp_test_YwZhdfMsPm2X45', // Replace with your Razorpay key
    amount: tokenDetails.price * 100,
    currency: 'INR',
    name: 'Token Purchase',
    description: `Purchase of ${tokenDetails.name}`,
    image: 'your_logo_url', // Optional
    prefill: {
      name: 'Your Name',
      email: 'your_email@example.com',
      contact: 'your_contact_number',
    },
    theme: {
      color: '#528FF0',
    },
    handler: async function (response) {
      try {
        const updateRes = await updateTokenForClient(clientId, tokenId);
        if (updateRes.success) {
          onSuccess(updateRes.message);
        } else {
          onFailure(updateRes.message || "Payment succeeded but updating the token failed.");
        }
      } catch (err) {
        console.error("Error while updating token:", err);
        onFailure("Payment succeeded but token update request failed.");
      }
    },
    modal: {
      ondismiss: () => {
        onFailure("Payment was cancelled.");
      },
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

// Leave Management Functions
export const getLeaveRequests = async () => {
    try {
        const response = await fetch(`${config.baseURL}/getAllLeaveRequests`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        if (response.ok) {
             return {
                success: true,
                data: data 
            };
        } else {
             return {
                success: false,
                message: data.message || "Failed to fetch leave requests"
            };
        }
    } catch (error) {
         return {
            success: false,
            message: error.message || "Something went wrong"
        };
    }
};

export const updateLeaveStatus = async (leave_id, status) => {
    try {
        const response = await fetch(`${config.baseURL}/updateLeaveStatus`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ leave_id, status }),
        });

        const data = await response.json();
        if (response.ok) {
             return {
                success: true,
                message: data.message || `Leave Request ${status}`
            };
        } else {
             return {
                success: false,
                message: data.message || "Failed to update status"
            };
        }
    } catch (error) {
         return {
            success: false,
            message: error.message || "Something went wrong"
        };
    }
};

export const fetchClientDashboardStats = async (client_id) => {
    try {
        const response = await fetch(`${config.baseURL}/getClientDashboardStats?client_id=${client_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        if (response.ok) {
             return {
                success: true,
                data: data.data
            };
        } else {
             return {
                success: false,
                message: data.message || "Failed to fetch dashboard stats"
            };
        }
    } catch (error) {
         return {
            success: false,
            message: error.message || "Something went wrong"
        };
    }
};