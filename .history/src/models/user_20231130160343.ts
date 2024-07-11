import mongoose from "mongoose";

const user =  new mongoose.Schema({
    name:{type: String},
    email:{type:String},
    password:{type:String},
    contactNumber:{type:String}
})