import axios from 'axios';

export const fetchAllProducts = () => {
  return new Promise(async (resolve) => {
    const response = await axios.get('http://localhost:8000/api/v1/products');
    resolve({ data: response.data });
  });
};

export const fetchSingleProduct = (id) => {
  return new Promise(async (resolve) => {
    const response = await axios.get(`http://localhost:8000/api/v1/products/product/${id}`);
    resolve({ data: response.data });
  });
};

export const updateProduct = (updatedProduct) => {
  return new Promise(async (resolve) => {
    const response = await axios.patch(`http://localhost:8000/api/v1/products/update/${updatedProduct._id}`, updatedProduct, {
      headers: { 'Content-Type': 'application/json' }
    });
    resolve({ data: response.data });
  });
};

export const createProduct = (productData) => {
  return new Promise(async (resolve) => {
    const response = await axios.post('http://localhost:8000/api/v1/products/create', productData, {
      headers: { 'Content-Type': 'application/json' }
    });
    resolve({ data: response.data });
  });
};

export const fetchCategories = () => {
  return new Promise(async (resolve) => {
    const response = await axios.get('http://localhost:8000/api/v1/categories');
    resolve({ data: response.data });
  });
};

export const fetchBrands = () => {
  return new Promise(async (resolve) => {
    const response = await axios.get('http://localhost:8000/api/v1/brands');
    resolve({ data: response.data });
  });
};

export const fetchFilterProducts = (pagination,search) => {
  let queryStr = '';

  for (let key in search) {
    queryStr += `${key}=${search[key]}&`;
  }


  for (let key in pagination) {
    queryStr += `${key}=${pagination[key]}&`;
  }


  return new Promise(async (resolve) => {
    const response = await axios.get(`http://localhost:8000/api/v1/products?${queryStr}`);
    console.log(response.data)
    resolve({ data: response.data });
  });
};
