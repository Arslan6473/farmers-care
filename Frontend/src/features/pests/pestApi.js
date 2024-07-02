import axios from "axios";

export const fetchSinglePest = (pestId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/pests/pest/${pestId}`
      );
      resolve({ data: response.data });
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchAllPests = (pagination) => {
  let qureyStr=""

  for (let key in pagination){
    qureyStr += `${key}=${pagination[key]}&`
  }

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/pests/?${qureyStr}`)
   
      resolve({ data: response.data });
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchSelectedPests = (cropName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/pests/pest/?crop=${cropName}`
      );
      console.log(response.data);
      resolve({ data: response.data });
    } catch (error) {
      reject(error);
    }
  });
};
