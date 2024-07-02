import { asyncHandler } from "../routes/utils/asyncHandler.js";
import { ApiError } from "../routes/utils/ApiError.js";
import { Product } from "../models/product.model.js";
import { ApiResponse } from "../routes/utils/ApiResponse.js";

const createProduct = asyncHandler(async (req, res) => {
  // Get product data from frontend
  const {
    title,
    description,
    price,
    discountPercentage,
    stock,
    company,
    rating,
    category,
    thumbnail,
    packSize,
    ingredients,
    crops
  } = req.body;

  // Validate if any field is empty
  if (
    [
      title,
      description,
      price,
      discountPercentage,
      stock,
      company,
      category,
      thumbnail,
      packSize,
      ingredients,
      crops
    ].some((field) => field == null || field === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Create product
  const createdProduct = await Product.create({
    title,
    description,
    price,
    discountPercentage,
    stock,
    company,
    rating,
    category,
    thumbnail,
    packSize,
    ingredients,
    crops
  });

  if (!createdProduct) {
    throw new ApiError(500, "Something went wrong while creating the product");
  }

  // Send response
  return res
    .status(201)
    .json(new ApiResponse(201, createdProduct, "product created successfully"));
});

const updateProduct = asyncHandler(async (req, res) => {
  // Get product data from frontend
  const {
    title,
    description,
    price,
    discountPercentage,
    stock,
    company,
    rating,
    category,
    thumbnail,
    deleted,
    packSize,
    ingredients,
    crops
  } = req.body;

  // Validate if all fields are empty
  if (
    [
      title,
      description,
      price,
      discountPercentage,
      stock,
      company,
      rating,
      category,
      thumbnail,
      deleted,
      packSize,
      ingredients,
      crops
    ].every((field) => field == null || field === "")
  ) {
    throw new ApiError(400, "At least one field is required");
  }

  // Update product in db
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title,
        description,
        price,
        discountPercentage,
        stock,
        company,
        rating,
        category,
        thumbnail,
        deleted,
        packSize,
        ingredients,
        crops
      },
    },
    { new: true }
  );

  // Check if product not found
  if (!updatedProduct) {
    throw new ApiError(404, "Product not found");
  }

  return res.status(200).json(updatedProduct);
});

const fetchSingleProduct = asyncHandler(async (req, res) => {
  
  const singleProduct = await Product.findById(req.params.id);


  if (!singleProduct) {
    throw new ApiError(404, "Product not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(201, singleProduct, "product fetched successfully"));
});

const fetchFilteredProducts = asyncHandler(async (req, res) => {
  let condition = {};
  ;
  if (!req.query.admin) {
    condition = { deleted: { $ne: true } };
  }

  

  let query = Product.find(condition);
  let totalProductsQuery = Product.find(condition)

  if (req.query._search) {
    const search = req.query._search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    query = query.find({ title: { $regex: `.*${search}.*`, $options: "i" } });
  }

  if (req.query.category) {
    query = query.find({ category: req.query.category });
    totalProductsQuery = totalProductsQuery.find({
      category: req.query.category,
    });
  }

  if (req.query._page && req.query._per_page) {
    const pageSize = +req.query._per_page;
    const page = +req.query._page;
    const skip = pageSize * (page - 1);
    query = query.skip(skip).limit(pageSize);
  }

  const products = await query.exec();
  const items = await totalProductsQuery.countDocuments().exec();

  if (!products) {
    throw new ApiError(500, "Something went wrong while fetching products");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        201,
        { products,items },
        "product fetched successfully"
      )
    );
});

export {
  createProduct,
  updateProduct,
  fetchFilteredProducts,
  fetchSingleProduct,
};
