import axios from "axios";

export const fetchSingleDisease = (diseaseId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/diseases/disease/${diseaseId}`
      );
      resolve({ data: response.data });
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchAllDiseases = (pagination) => {
 let qureyStr=""

  for (let key in pagination){
    qureyStr += `${key}=${pagination[key]}&`
  }

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/diseases/?${qureyStr}`)
   
      resolve({ data: response.data });
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchSelectedDiseases = (cropName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/diseases/disease/?crop=${cropName}`
      );
      console.log(response.data);
      resolve({ data: response.data });
    } catch (error) {
      reject(error);
    }
  });
};
