"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const product_model_1 = __importDefault(require("../models/product.model"));
const uploadToCloudinary_1 = require("./uploadToCloudinary");
const defaultProducts_1 = require("./defaultProducts");
require("dotenv").config();
const seedProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Debug: Check MongoDB URI
        console.log("MongoDB URI:", process.env.MONGO_URI);
        // Connect to MongoDB
        yield mongoose_1.default.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        // Clear existing products
        yield product_model_1.default.deleteMany({});
        console.log("Cleared existing products");
        // Update product images with Cloudinary URLs
        for (const product of defaultProducts_1.defaultProducts) {
            try {
                const imageUrl = yield (0, uploadToCloudinary_1.uploadToCloudinary)(product.image);
                if (imageUrl) {
                    product.image = imageUrl;
                }
            }
            catch (error) {
                console.error("Error uploading image to Cloudinary:", error);
            }
        }
        // Insert updated products
        yield product_model_1.default.insertMany(defaultProducts_1.defaultProducts);
        console.log("Default products added!");
        // Close the connection
        mongoose_1.default.connection.close();
        console.log("MongoDB connection closed.");
    }
    catch (error) {
        console.error("Error in seeding products:", error);
    }
});
seedProduct();
