import mongoose from "mongoose"


export const connectDB = () => {
    try {
        mongoose.connect("mongodb+srv://snehal:lOapDPadVYdw6SHJ@cluster0.e7zs7ml.mongodb.net/demo_db")
        console.log("DB connected")

    } catch (error) {

    }

}