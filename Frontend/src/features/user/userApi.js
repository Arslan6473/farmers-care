import axios from 'axios';

export const fetchLoggedInUserOrders = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/orders/login-user/${userId}`);
      resolve({ data: response.data });
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchLoggedInUser = (userId) => {
  
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/users/current-user/${userId}`, {
        headers: { 'Content-Type': 'application/json' },
      });
      
      resolve({ data: response.data });
    } catch (error) {
      reject(error);
    }
  });
};

export const updateUser = (update) => {
  console.log(update)
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.patch(`http://localhost:8000/api/v1/users/update-user/${update._id}`, update, {
        headers: { 'Content-Type': 'application/json' },
      });
      resolve({ data: response.data });
    } catch (error) {
      reject(error);
    }
  });
};
