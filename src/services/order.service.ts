import orderModel from "../models/order.model";
import productModel from "../models/product.model";

export const createOrder = async (userId: string , productId:string , quantity:number) => {

    const product = await productModel.findById(productId);
    if(!product) {throw new Error("Product not found");}
    const totalAmount = product.price * quantity;
    const newOrder = new orderModel({
        user: userId , 
        product :productId ,
        quantity,
        totalAmount,
        status: "pending"
    });
    return await newOrder.save();
}



