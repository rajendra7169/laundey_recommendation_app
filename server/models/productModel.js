import mongoose from "mongoose";

// create schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
  subCategory: { type: String, required: true },
  sizes: { type: Array, required: true },
  bestseller: { type: Boolean },
  date: { type: Number, required: true },
  phone: { type: String, required: true }, // New field for phone number
  email: { type: String, required: true }, // New field for email address
  socialPage: { type: String, required: true }, // New field for Facebook page
  shopLocation: { type: String, required: true }, // New field for shop location
});

// create model
const productModel =
  mongoose.models.product || mongoose.model("Product", productSchema);

export default productModel;
