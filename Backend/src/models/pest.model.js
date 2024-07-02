import mongoose, { Schema } from "mongoose";

const pestSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail:{
    type: String,
    required: true,
  },
  crop: {
    type: String,
    required:true
  },
});

export const Pest = mongoose.model("pest", pestSchema);