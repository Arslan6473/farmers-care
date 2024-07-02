import { asyncHandler } from "../routes/utils/asyncHandler.js";
import { ApiError } from "../routes/utils/ApiError.js";
import { Cart } from "../models/cart.model.js";
import { ApiResponse } from "../routes/utils/ApiResponse.js";

const createCartItem = asyncHandler(async (req, res) => {
  // Get product data from frontend
  const { product, quantity, user } = req.body;

  // Validate any field is empty
  if (
    [product, quantity, user].some((field) => field == null || field === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Create product
  const createdCartItem = await Cart.create({ product, quantity, user });

  if (!createdCartItem) {
    throw new ApiError(500, "Something went wrong while creating cart item");
  }

  const addedCartItem = await Cart.find({_id:createdCartItem._id}).populate(
    "product"
  );

  // Send response
  return res
  .status(201)
  .json(new ApiResponse(200,  addedCartItem , "added to cart successfully"));
});

const updateCartItem = asyncHandler(async (req, res) => {
  // Get product data from frontend
  const { product, quantity } = req.body;

  // Validate if all fields are empty
  if (
    [product, quantity].every((field) => field == null || field === "")
  ) {
    throw new ApiError(400, "At least one field is required");
  }

  // Update product in db
  const updatedCartItem = await Cart.findByIdAndUpdate(
    req.params.id,
    { $set: { quantity } },
    { new: true }
  );

  // Check if product not found
  if (!updatedCartItem) {
    throw new ApiError(404, "Cart item not found");
  }

  const updatedItem = await Cart.find({_id:updatedCartItem._id}).populate(
    "product"
  );

  return res
  .status(200)
  .json(new ApiResponse(200,  updatedItem , "cart item updated successfully"));
});

const fetchAllCartItems = asyncHandler(async (req, res) => {
 
  const cartItems = await Cart.find({ user: req.params.id }).populate(
    "product"
  );

  if (!cartItems) {
    throw new ApiError(500, "Something went wrong while fetching cart items");
  }

  return res
  .status(200)
  .json(new ApiResponse(200,  cartItems , "cart items fetched successfully"));
});

const deleteCartItem = asyncHandler(async (req, res) => {
  const deletedItem = await Cart.find({ _id: req.params.id }).populate(
    "product"
  );

  if (!deletedItem) {
    throw new ApiError(404, "Cart item not found");
  }

  await Cart.findByIdAndDelete(req.params.id);

  return res
  .status(200)
  .json(new ApiResponse(200,  deletedItem , "cart item deleted successfully"));
});

export { createCartItem, updateCartItem, fetchAllCartItems, deleteCartItem };
