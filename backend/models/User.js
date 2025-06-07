import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    age:Number
})

export const Usermodel = mongoose.model('Users',UserSchema)
