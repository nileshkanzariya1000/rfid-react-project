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
};export const updateAdminPassword = async (username, oldPassword, newPassword) => {
  try {
    const url = `${config.baseURL}/adminChangePassword`;
    const requestBody = { 
      username, // Simplified object property shorthand
      current_password: oldPassword, 
      new_password: newPassword 
    };
    
    console.log('Making request to:', url);
    console.log('With body:', requestBody);
    
    const response = await fetch(url, {
      method: "PUT", // Changed from POST to PUT
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const textResponse = await response.text();
    console.log("Raw API Response:", textResponse);

    try {
      const data = JSON.parse(textResponse);
      if (!response.ok) {
        throw new Error(data.message || "Password update failed");
      }
      return data;
    } catch {
      throw new Error("Invalid JSON response. API might be returning HTML or an error page.");
    }
  } catch (error) {
    console.error("API call failed:", error);
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
