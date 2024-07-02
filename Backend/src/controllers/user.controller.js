import { asyncHandler } from "../routes/utils/asyncHandler.js";
import { ApiError } from "../routes/utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../routes/utils/ApiResponse.js";

const generateAccessTokenandRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error.message);
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  //get user data from the frontend
  // console.log(req.body);
  const { email, fullName, password } = req.body;


  //validation - not empty
  if ([email, fullName, password].some((field) => field?.trim() === ""))
    throw new ApiError(400, "All fields are required");

  if (!email.includes("@")) throw new ApiError(400, "Email requires @ symbol");

  //check if user already exists (email and username)
  const existedUser = await User.findOne({
    email: email,
  });

  if (existedUser)
    throw new ApiError(409, "User with the email or username already exists");


console.log(email, fullName, password)
  //create user object - create entry in db
  const user = await User.create({
    fullName,
    email,
    password,
  });

  console.log(user)

  const { accessToken, refreshToken } =
    await generateAccessTokenandRefreshToken(user._id);

  //remove password and refresh token field from response
  const userCreated = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  //check for user creation
  if (!userCreated)
    throw new ApiError(500, "Something went wrong while registering the user");

  const option = {
    httpOnly: true,
    secure: true,
  };
  //return response
  return res
    .status(201)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(new ApiResponse(200, userCreated, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  //get response from frontend
  const { email, password } = req.body;

  if (!email) throw new ApiError(404, " email is required");

  //Check user exists in db
  const user = await User.findOne({
    email: email,
  });

  if (!user) throw new ApiError(404, "Invalid user");

  //check password

  const isValidPassword = await user.isPasswordCorrect(password);

  if (!isValidPassword) throw new ApiError(401, "Invalid user credentials");

  //Generate refresh token and access token

  const { accessToken, refreshToken } =
    await generateAccessTokenandRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const option = {
    httpOnly: true,
    secure: true,
  };

  //send cookies response
  res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(new ApiResponse(200, loggedInUser, "user loggedIn successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const option = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json(new ApiResponse(200, {}, "User logout successfully"));
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) throw new ApiError(400, "Invalid old password");

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password change successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if(!user ) throw new ApiError(400, "no user find");

  return res.status(200).json(new ApiResponse(200, user, "Current user fetched successfully"));
});

const changeAccountDetails = asyncHandler(async (req, res) => {
  const { email, fullName, addresses } = req.body;

  if (!(email || fullName || addresses))
    throw new ApiError(400, "Email or fullName is required");

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        fullName,
        email,
        addresses,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  changeCurrentPassword,
  getCurrentUser,
  changeAccountDetails,
};
