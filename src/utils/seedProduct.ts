import mongoose from "mongoose";
import productModel from "../models/product.model";
import { uploadToCloudinary } from "./uploadToCloudinary";
import { defaultProducts } from "./defaultProducts";
import User from "../models/user.model"; // Import User model

require("dotenv").config();

const seedProduct = async () => {
  try {
    // Debug: Check MongoDB URI
    console.log("MongoDB URI:", process.env.MONGO_URI);

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to MongoDB");

    // Clear existing products
    await productModel.deleteMany({});
    console.log("Cleared existing products");

    // Update product images with Cloudinary URLs and fetch valid ObjectId for sellers
    for (const product of defaultProducts) {
      try {
        // Upload image to Cloudinary
        const imageUrl = await uploadToCloudinary(product.image);
        if (imageUrl) {
          product.image = imageUrl;
        }

        // Fetch valid ObjectId for seller
        const user = await User.findOne({ username: product.seller });
        if (user) {
          product.seller = user._id; // Replace with valid ObjectId
        } else {
          console.error(`Seller not found: ${product.seller}`);
          continue; // Skip this product if seller is not found
        }
      } catch (error) {
        console.error("Error processing product:", error);
      }
    }

    // Insert updated products
    await productModel.insertMany(defaultProducts);
    console.log("Default products added!");

    // Close the connection
    mongoose.connection.close();
    console.log("MongoDB connection closed.");
  } catch (error) {
    console.error("Error in seeding products:", error);
  }
};

seedProduct();