import mongoose from "mongoose";
import productModel from "../models/product.model";
import { uploadToCloudinary } from "./uploadToCloudinary";
import { defaultProducts } from "./defaultProducts";
import User from "../models/user.model"; 

require("dotenv").config();

const seedProduct = async () => {
  try {
    
    console.log("MongoDB URI:", process.env.MONGO_URI);

   
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to MongoDB");

    await productModel.deleteMany({});
    console.log("Cleared existing products");

    
    for (const product of defaultProducts) {
      try {
     
        const imageUrl = await uploadToCloudinary(product.image);
        if (imageUrl) {
          product.image = imageUrl;
        }

   
        const user = await User.findOne({ username: product.seller });
        if (user) {
          product.seller = user._id; 
        } else {
          console.error(`Seller not found: ${product.seller}`);
          continue; 
        }
      } catch (error) {
        console.error("Error processing product:", error);
      }
    }

    await productModel.insertMany(defaultProducts);
    console.log("Default products added!");

   
    mongoose.connection.close();
    console.log("MongoDB connection closed.");
  } catch (error) {
    console.error("Error in seeding products:", error);
  }
};

seedProduct();