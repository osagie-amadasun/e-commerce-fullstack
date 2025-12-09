import mongoose from "mongoose";

let isConnected = false;

export const connectOrderDB = async () => {
  if (isConnected) return;
  if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL is not defined in the env file!");
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
