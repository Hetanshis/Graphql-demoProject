import mongoose from "mongoose";

const userSchema =  new mongoose.Schema({
    name:{type: String},
    email:{type:String},
    password:{type:String},
    contactNumber:{type:String},
    login_token: {type:String}
})

const User = mongoose.model("User", userSchema)
export default User