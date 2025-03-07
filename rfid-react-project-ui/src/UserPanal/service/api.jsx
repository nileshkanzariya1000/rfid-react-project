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
        Cookies.set('user_data', JSON.stringify({ "user_id":user_id, "user_name":name,"user_email":email,"user_mobile": mobile }), { expires: 1 });

        return data;  // Return the full data from the API (success or error message, etc.)
      } else {
        throw new Error(data.message || 'Update failed');
      }
    } catch (error) {
      throw new Error(error.message || 'Something went wrong');
    }
  };
  