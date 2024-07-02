import axios from "axios";

export const fetchSingleCrop = (cropId) => {
  
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/crops/crop/${cropId}`);
        resolve({data:response.data});
      } catch (error) {
        reject(error);
      }
    });
  };

  export const fetchAllCrops = () => {
  
    
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/crops`);
        resolve({data:response.data});
      } catch (error) {
        reject(error);
      }
    });
  };