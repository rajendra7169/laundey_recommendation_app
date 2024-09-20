import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("MongoDB is connected");
  });

  await mongoose.connect(`${process.env.MONGODB_URI}/laundry`);
};

export default connectDB;
