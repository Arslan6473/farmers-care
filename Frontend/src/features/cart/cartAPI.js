import axios from 'axios';

export const addToCart = (item) => {
  return new Promise(async (resolve) => {
    const response = await axios.post("http://localhost:8000/api/v1/cart/add-item", item, {
      headers: { "content-type": "application/json" },
    });
    resolve({ data: response.data });
  });
};

export const fetchAllCartItems = (userId) => {
 
  return new Promise(async (resolve) => {
    const response = await axios.get(`http://localhost:8000/api/v1/cart/user-items/${userId}`);
    resolve({ data: response.data });
  });
};

export const updateCart = (update) => {
  console.log(update)
  return new Promise(async (resolve) => {
    const response = await axios.patch(`http://localhost:8000/api/v1/cart/update/${update.id}`, update, {
      headers: { "content-type": "application/json" },
    });
    resolve({ data: response.data });
  });
};

export const deleteCartItem = (itemid) => {
  return new Promise(async (resolve) => {
    const response = await axios.delete(`http://localhost:8000/api/v1/cart/delete/${itemid}`, {
      headers: { "content-type": "application/json" },
    });
    resolve({ data: response.data });
  });
};

export const resetCart = (userId) => {
  return new Promise(async (resolve) => {
    const response = await fetchAllCartItems(userId);
    const items = response.data;
    for (let item of items.data) {
      await deleteCartItem(item._id);
    }
    resolve({ status: "successful" });
  });
};
