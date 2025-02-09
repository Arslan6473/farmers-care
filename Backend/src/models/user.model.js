import mongoose, { Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userSchema = new Schema({
   
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    fullName:{
        type:String,
        required:true,
        index:true
    },
    password:{
        type:String,
        required:[true , "Password is required"]
    },
    addresses: [
      {
        type: Schema.Types.Mixed,
      },
    ],

    refreshToken:{
        type:String,
    },
    role:{
     type:String,
     default:"user",
     required:true
    }
  
   },
   {
    timestamps:true
   }

)

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      this.password =await bcrypt.hash(this.password, 10);
      next();
    } else {
      return next();
    }
  });
  
  userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  
  userSchema.methods.generateAccessToken = function(){
   return  jwt.sign(
      {
        _id : this._id,
        username : this.userName,
        email:this.email,
        fullName:this.fullName
  
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
      }
    )
  }
  
  userSchema.methods.generateRefreshToken = function(){
    return  jwt.sign(
      {
        _id : this._id,
  
      },
      process.env.REFREH_TOKEN_SECRET,
      {
        expiresIn:process.env.REFREH_TOKEN_EXPIRY
      }
    )
  }
  

export const User = mongoose.model("User",userSchema)