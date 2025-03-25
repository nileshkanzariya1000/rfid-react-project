import config from '../../config';
import Cookies from 'js-cookie';
export const login = async (email, password) => {
    try {
      const response = await fetch(`${config.baseURL}/userLogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        return data;  // Return the full data from the API (success or error message, etc.)
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      throw new Error(error.message || 'Something went wrong');
    }
  };
  
  export const register = async (name, email, password, mobile) => {
    try {
      const response = await fetch(`${config.baseURL}/userRegister`, {
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

  export const updateUser = async (user_id, name, email, mobile) => {
    try {
      const response = await fetch(`${config.baseURL}/userUpdate`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id, name, email, mobile }),
      });
  
      const data = await response.json();
      if (response.ok) {
        Cookies.set(
          'user_data', 
          JSON.stringify({ "user_id":user_id, "user_name":name,"user_email":email,"user_mobile": mobile }), { expires: 1 });

        return data;  // Return the full data from the API (success or error message, etc.)
      } else {
        throw new Error(data.message || 'Update failed');
      }
    } catch (error) {
      throw new Error(error.message || 'Something went wrong');
    }
  };
  
  export const updateUserPassword = async (user_id, current_password, new_password) => {
    try {
        const response = await fetch(`${config.baseURL}/userChangePassword`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id, current_password, new_password }),
        });

        const data = await response.json();
        if (response.ok) {
            return data;  // Return success response from API
        } else {
          
          return data;  // Return success response from API

        }
    } catch (error) {
        throw new Error(error.message || 'Something went wrong');
    }
};


export const getUserSubjects = async () => {
  try {
    const userData = Cookies.get("user_data");
    if (!userData) throw new Error("User not logged in");

    const { user_id } = JSON.parse(userData);
    const response = await fetch(`${config.baseURL}/getUserSubjects?user_id=${user_id}`, {
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

export const getUserSubjectDetails = async (ct_id) => {
  try {
    const userData = Cookies.get("user_data");
    if (!userData) throw new Error("User not logged in");

    const { user_id } = JSON.parse(userData);
    if (!user_id || !ct_id) throw new Error("Missing required parameters");

    const response = await fetch(`${config.baseURL}/getUserSubjectDetalis?user_id=${user_id}&ct_id=${ct_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      return data; // Return full response (success + data)
    } else {
      throw new Error(data.message || "Failed to fetch subject details");
    }
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const getPunchRecordByUser = async (ct_id,from_date,to_date) => {
  try {
    const userData = Cookies.get("user_data");
    if (!userData) throw new Error("User not logged in");

    const { user_id } = JSON.parse(userData);
    if (!user_id || !ct_id) throw new Error("Missing required parameters");

    const response = await fetch(`${config.baseURL}/getPunchRecordByUser?user_id=${user_id}&ct_id=${ct_id}&from_date=${from_date}&to_date=${to_date}`, {
      method: "GET",
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




