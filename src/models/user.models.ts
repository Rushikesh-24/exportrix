
import mongoose from "mongoose";
import { Schema } from "mongoose";



const userSchema = new Schema(
  {
    name: {
        type: String,
       
    },
    email:{
        type: String,
    },
    industry: {
        type: String,
     
    },
    revenue: {
        type: String,
     
    },
    employees: {
        type: String,
     
    },
    description: {
        type: String,
     
    },
    password: {
        type: String,
     
    },
    hs_code:{
        type: String,
    },
    bussinessName:{
        type: String,
    }

}

);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
