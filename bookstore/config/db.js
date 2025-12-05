import mongoose from "mongoose";

export const connectDB = async () => {
    const MONGODB_URI = process.env.URI;

    if (!MONGODB_URI) {
        console.log("MONGODB_URI is missing. Add it to your .env file.");
        return;
    }

    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.log(" Failed to connect to MongoDB");
        console.log(error.message);
    }
};
