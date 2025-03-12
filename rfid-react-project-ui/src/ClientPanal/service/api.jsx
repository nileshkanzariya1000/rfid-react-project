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
      throw new Error(data.message || 'Failed to fetch user details for subject');
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