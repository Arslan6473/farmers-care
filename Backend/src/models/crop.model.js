import mongoose, { Schema } from "mongoose";

const cropSchema = new Schema({
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
  monthOfGrowth: 
    {
      type: String,
    required: true,
    },
  
});

export const Crop = mongoose.model("Crop", cropSchema);
