import { asyncHandler } from "../routes/utils/asyncHandler.js";
import { ApiError } from "../routes/utils/ApiError.js";
import { Category } from "../models/category.model.js";
import { ApiResponse } from "../routes/utils/ApiResponse.js";

const createCategory = asyncHandler(async (req, res) => {
  const { value, label } = req.body;

  if (!value || !label) {
    throw new ApiError(400, "Both label and value are required");
  }

  const createdCategory = await Category.create({ value, label });

  if (!createdCategory) {
    throw new ApiError(500, "Something went wrong while creating the category");
  }

  return res
  .status(200)
  .json(new ApiResponse(200, createdCategory, "category created successfully"));
});

const fetchAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});

  return res
  .status(200)
  .json(new ApiResponse(200,  categories , "category fetched successfully"));
});

export { createCategory, fetchAllCategories };