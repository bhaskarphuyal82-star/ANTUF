import mongoose from "mongoose";

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  
  try {
    const dbUrl = process.env.DB_URL || process.env.MONGODB_URI;
    
    if (!dbUrl) {
      throw new Error("Database URL not provided. Please set DB_URL or MONGODB_URI environment variable.");
    }
    
    console.log("Connecting to database...");
    await mongoose.connect(dbUrl);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

export default dbConnect;