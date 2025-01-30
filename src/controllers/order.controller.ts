import { Request , Response } from "express";
import orderModel from "../models/order.model";
import { STATUS_CODES } from "../constants/STATUS_CODES";
import { createOrder } from "../services/order.service";

export const createOrderController = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(STATUS_CODES.UNAUTHORIZED).json({ message: "Unauthorized" });
        return;
      }
  
      console.log("🔍 Order request body:", req.body);
  
      const { productId, quantity } = req.body;
      const userId = (req as any).user.userId;
  
      if (!productId || !quantity) {
        res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Missing required fields" });
        return;
      }
  
      const order = await createOrder(userId, productId, quantity);
  
      res.status(STATUS_CODES.CREATED).json({ message: "Order created successfully", order });
    } catch (error: any) {
      console.error("❌ Error in createOrderController:", error);
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  };

export const getOrdersController = async (req: Request, res: Response) => {
    try {
        const orders = await orderModel.find().populate("user products.product");
        res.json(orders)
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({message: (error as Error).message});
        
    }
}