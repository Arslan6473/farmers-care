import axios from 'axios';

export const createOrder = async (order) => {
  try {
    const response = await axios.post('http://localhost:8000/api/v1/orders/create', order, {
      headers: { 'Content-Type': 'application/json' },
    });
    return { data: response.data };
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const updateOrder = async (updatedOrder) => {
  try {
    const response = await axios.patch(`http://localhost:8000/api/v1/orders/update/${updatedOrder._id}`, updatedOrder, {
      headers: { 'Content-Type': 'application/json' },
    });
    return { data: response.data };
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
};

export const fetchAllOrders = async (pagination) => {
  try {
    const queryStr = new URLSearchParams(pagination).toString();
    const response = await axios.get(`http://localhost:8000/api/v1/orders/?${queryStr}`);
    return { data: response.data };
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};
