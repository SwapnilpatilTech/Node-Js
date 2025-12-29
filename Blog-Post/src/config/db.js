import mongoose from "mongoose";

export const connectDB = async (mongoURL) => {
    try {
        await mongoose.connect(mongoURL);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
};
