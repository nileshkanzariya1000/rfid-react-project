import config from '../../config';

export const login = async (username, password) => {
    try {
      const response = await fetch(`${config.baseURL}/adminlogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
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
