import { asyncHandler } from "../routes/utils/asyncHandler.js";
import { ApiError } from "../routes/utils/ApiError.js";
import { ApiResponse } from "../routes/utils/ApiResponse.js";
import { Pest } from "../models/pest.model.js";

const createPest = asyncHandler(async (req, res) => {
  const {  title,description,thumbnail,crop } = req.body;

  if (!title || !description ||!thumbnail||!crop ) {
    throw new ApiError(400, "all value are required");
  }

  const createdPest = await Pest.create({ title,description,thumbnail,crop});

  if (!createdPest) {
    throw new ApiError(500, "Something went wrong while creating the pest");
  }

  return res
  .status(200)
  .json(new ApiResponse(200, createdPest, "pest created successfully"));
});

const fetchAllPests = asyncHandler(async (req, res) => {

  let query = Pest.find();
  let totalProductsQuery = Pest.find();

  if (req.query._page && req.query._per_page) {
    const pageSize = +req.query._per_page;
    const page = +req.query._page;
    const skip = pageSize * (page - 1);
    query = query.skip(skip).limit(pageSize);
  }

  const pests = await query.exec();
  const items = await totalProductsQuery.countDocuments().exec();
  

  return res
  .status(200)
  .json(new ApiResponse(200,  {pests,items} , "pest fetched successfully"));
});

const fetchSelectedPests = asyncHandler(async (req, res) => {

  const pests = await Pest.find({crop:req.query.crop});

  return res
  .status(200)
  .json(new ApiResponse(200,  pests , "pest fetched successfully"));
});


const fetchSinglePest = asyncHandler(async (req, res) => {
    // Fetch product from db
    const singlePest = await Pest.findById(req.params.id);
  
    //Check if product not found
    if (!singlePest) {
      throw new ApiError(404, "pest not found");
    }
  
    return res
      .status(200)
      .json(new ApiResponse(201, singlePest, "pest fetched successfully"));
  });

export { createPest, fetchAllPests ,fetchSinglePest,fetchSelectedPests};