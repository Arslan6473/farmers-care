import { asyncHandler } from "../routes/utils/asyncHandler.js";
import { ApiError } from "../routes/utils/ApiError.js";
import { ApiResponse } from "../routes/utils/ApiResponse.js";
import { Disease } from "../models/Disease.model.js";

const createDisease = asyncHandler(async (req, res) => {
  const {  title,description,thumbnail,causedBy,crop } = req.body;

  if (!title || !description ||!thumbnail ||!causedBy ||!crop) {
    throw new ApiError(400, "all value are required");
  }

  const createdDisease = await Disease.create({ title,description,thumbnail,causedBy,crop});

  if (!createdDisease) {
    throw new ApiError(500, "Something went wrong while creating the Disease");
  }

  return res
  .status(200)
  .json(new ApiResponse(200, createdDisease, "Disease created successfully"));
});

const fetchAllDiseases = asyncHandler(async (req, res) => {
  

  
  let query = Disease.find();
  let totalProductsQuery = Disease.find();

  if (req.query._page && req.query._per_page) {
    const pageSize = +req.query._per_page;
    const page = +req.query._page;
    const skip = pageSize * (page - 1);
    query = query.skip(skip).limit(pageSize);
  }

  const diseases = await query.exec();
  const items = await totalProductsQuery.countDocuments().exec();

  return res
  .status(200)
  .json(new ApiResponse(200,  {diseases,items} , "Diseases fetched successfully"));
});

const fetchSelectedDiseases = asyncHandler(async (req, res) => {
  const Diseases = await Disease.find({crop:req.query.crop});

  return res
  .status(200)
  .json(new ApiResponse(200,  Diseases , "Diseases fetched successfully"));
});


  const fetchSingleDisease = asyncHandler(async (req, res) => {
    // Fetch product from db
    const singleDisease = await Disease.findById(req.params.id);
  
    // Check if product not found
    if (!singleDisease) {
      throw new ApiError(404, "Disease not found");
    }
  
    return res
      .status(200)
      .json(new ApiResponse(201, singleDisease, "Disease fetched successfully"));
  });

export { createDisease, fetchAllDiseases ,fetchSingleDisease,fetchSelectedDiseases};