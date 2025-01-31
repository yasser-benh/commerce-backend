import mongoose from "mongoose";
import Product from "../models/product.model";
import defaultProducts from "../defaultProducts";

const seedProducts = async () => {
    try {
        await mongoose.connect ('mongodb+srv://benhasseneyasser:Saida1996Mohamed@cluster0.l2hmd.mongodb.net/?retryWrites=true&w=majority')
        await Product.deleteMany({});
        await Product.insertMany(defaultProducts);

        console.log('Products Seeded Successfully');
    } catch (error) {
        console.log('Error Seeding Products', error);
    } finally {
        await mongoose.disconnect();
    }
}
seedProducts();