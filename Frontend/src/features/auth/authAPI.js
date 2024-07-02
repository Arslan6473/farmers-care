import axios from 'axios';

export const createUser = (userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("http://localhost:8000/api/v1/users/register", userData, {
        headers: { "content-type": "application/json" },
      });
      resolve({ data: response.data });
    } catch (error) {
      reject(error);
    }
  });
};

export const logoutUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("http://localhost:8000/api/v1/users/signout", {}, {
        headers: { "content-type": "application/json" },
      });
      resolve({ data: response.data });
    } catch (error) {
      reject(error);
    }
  });
};

export const logInUser = (userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("http://localhost:8000/api/v1/users/login", userData, {
        headers: { "content-type": "application/json" },
      });
      resolve({ data: response.data });
    } catch (error) {
      reject(error);
    }
  });
};
