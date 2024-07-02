import { asyncHandler } from "../routes/utils/asyncHandler.js";
import { ApiError } from "../routes/utils/ApiError.js";
import { ApiResponse } from "../routes/utils/ApiResponse.js";
import { Crop } from "../models/crop.model.js";

const createCrop = asyncHandler(async (req, res) => {
  const {  title,description,thumbnail,monthOfGrowth } = req.body;

  if (!title || !description ||!thumbnail ||!monthOfGrowth) {
    throw new ApiError(400, "all value are required");
  }

  const createdCrop = await Crop.create({ title,description,thumbnail,monthOfGrowth});

  if (!createdCrop) {
    throw new ApiError(500, "Something went wrong while creating the crop");
  }

  return res
  .status(200)
  .json(new ApiResponse(200, createdCrop, "crop created successfully"));
});

const fetchAllCrops = asyncHandler(async (req, res) => {
  const crops = await Crop.find({});

  return res
  .status(200)
  .json(new ApiResponse(200,  crops , "crops fetched successfully"));
});


const fetchSingleCrop = asyncHandler(async (req, res) => {
    // Fetch product from db
    const singleCrop = await Crop.findById(req.params.id);
  
    // Check if product not found
    if (!singleCrop) {
      throw new ApiError(404, "Crop not found");
    }
  
    return res
      .status(200)
      .json(new ApiResponse(201, singleCrop, "crop fetched successfully"));
  });

export { createCrop, fetchAllCrops ,fetchSingleCrop};