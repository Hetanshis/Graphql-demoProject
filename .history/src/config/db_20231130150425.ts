import mongoose from "mongoose";

const db = mongoose.connect(`${process.env.MONGODB_URL}`, {retryWrites:true,}, ).then(() => {
    console.log("Database connected successfully")
})