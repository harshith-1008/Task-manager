import { DB_NAME } from "../constants.js";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = `${process.env.MONGODB_URI}/${DB_NAME}`;
    const connectInstance = await mongoose.connect(mongoURI);
    console.log(
      "connection established with DB host: ",
      connectInstance.connection.host
    );
  } catch (error) {
    console.log("connection failed with MONGO DB");
    process.exit(1);
  }
};

export default connectDB;
