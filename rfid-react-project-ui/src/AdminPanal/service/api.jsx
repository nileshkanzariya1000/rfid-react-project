import Cookies from "js-cookie";
import config from "../../config";

// ✅ Admin Login Function (Returns full API response)
export const login = async (username, password) => {
    try {
        const response = await fetch(`${config.baseURL}/adminlogin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }
        return data;
    } catch (error) {
        throw new Error(error.message || "Something went wrong");
    }
};
export const updateAdminPassword = async (username, oldPassword, newPassword) => {
  try {
    const url = `${config.baseURL}/   `;
    const requestBody = { 
      username, // Simplified object property shorthand
      current_password: oldPassword, 
      new_password: newPassword 
    };

    const response = await fetch(url, {
      method: "PUT", // Changed from POST to PUT
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const textResponse = await response.text();
    try {
      const data = JSON.parse(textResponse);
      if (!response.ok) {
      return data;
      }
      return data;
    } catch {
      throw new Error("Old password incorrect");
    }
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const fetchClients = async () => {
  const response = await fetch(`${config.baseURL}/getAllClients`);
  if (!response.ok) throw new Error("Failed to fetch clients");
  return response.json();
};

export const updateClientStatus = async (client_id, status) => {
  const response = await fetch(`${config.baseURL}/updateClientStatus`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ client_id, status }),
  });

  if (!response.ok) throw new Error("Failed to update client status");

  return await response.json();
};
export const fetchUsers = async () => {
  const response = await fetch(`${config.baseURL}/getAllUsers`);
  if (!response.ok) throw new Error("Failed to fetch clients");
  return response.json();
};

export const updateUserStatus = async (user_id, status) => {
  const response = await fetch(`${config.baseURL}/updateUserStatus`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id, status }),
  });

  if (!response.ok) throw new Error("Failed to update client status");

  return await response.json();
};

// Fetch tokens using fetch instead of Axios
export const getTokensForAdmin = async () => {
  try {
    const response = await fetch(`${config.baseURL}/getTokensForAdmin`);
    if (!response.ok) {
      throw new Error("Failed to fetch tokens");
    }
    return await response.json(); // Convert response to JSON
  } catch (error) {
    console.error("Error fetching tokens:", error);
    return [];
  }
};


// Add a new token
export const addNewToken = async (tokenData) => {
  try {
    const response = await fetch(`${config.baseURL}/addNewToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tokenData),
    });
    if (!response.ok) {
      throw new Error("Failed to add token"); 
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding new token:", error);
    return { success: false, error: error.message };
  }
};


// Edit token details
export const editTokenDetails = async (tokenData) => {
  try {
    const response = await fetch(`${config.baseURL}/editTokenDetails`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tokenData),
    });
    return await response.json();
  } catch (error) {
    console.error("Error editing token:", error);
    return { success: false, message: "Failed to edit token" };
  }
};

// Toggle token status (Activate/Deactivate)
export const toggleTokenStatus = async (tokenId, status) => {
  try {
    const response = await fetch(`${config.baseURL}/editTokenDetails`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token_id: tokenId, status }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error updating token status:", error);
    return { success: false, message: "Failed to update token status" };
  }
};
export const fetchPurchasedTokens = async () => {
  try {
    const response = await fetch(`${config.baseURL}/getPurchasedTokens`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching purchased tokens:", error);
    throw error;
  }
};
