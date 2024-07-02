import mongoose, { Schema } from "mongoose";

const diseaseSchema = new Schema({
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
  causedBy: {
    type: String,
  },
  crop: {
    type: String,
    required:true
  },
 
});

export const Disease = mongoose.model("Disease", diseaseSchema);