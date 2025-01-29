import { Request, Response } from "express";
import { addProduct, editProduct, deleteProduct } from "../services/product.service";
import { STATUS_CODES } from "../constants/STATUS_CODES";
import  Product  from "../models/product.model";

export const addProductController = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(STATUS_CODES.UNAUTHORIZED).json({ message: 'Unauthorized' });
      return;
    }
    const { name, price, description } = req.body;
    const sellerId = req.user.userId;
    const product = await addProduct(sellerId, name, price, description);
    res.status(STATUS_CODES.CREATED).json({ message: 'Product added successfully', product });
  } catch (error: any) {
    res.status(STATUS_CODES.BAD_REQUEST).json({ error: error.message });
  }
};

export const editProductController = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.user) {
          res.status(STATUS_CODES.UNAUTHORIZED).json({ message: 'Unauthorized' });
          return;
        }
    
        const { productId } = req.params;
        const { name, price, description } = req.body;
        const sellerId = req.user.userId;
    
        const product = await Product.findOne({ _id: productId, seller: sellerId });
        if (!product) {
          res.status(STATUS_CODES.NOT_FOUND).json({ message: 'Product not found or unauthorized' });
          return;
        }
    
        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        await product.save();
    
        res.json({ message: 'Product updated successfully', product });
      } catch (error: any) {
        res.status(STATUS_CODES.BAD_REQUEST).json({ error: error.message });
      }
};
export const deleteProductController = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.user) {
          res.status(STATUS_CODES.UNAUTHORIZED).json({ message: 'Unauthorized' });
          return;
        }
    
        const { productId } = req.params;
        const sellerId = req.user.userId;
    
        const product = await Product.findOneAndDelete({ _id: productId, seller: sellerId });
        if (!product) {
          res.status(STATUS_CODES.NOT_FOUND).json({ message: 'Product not found or unauthorized' });
          return;
        }
    
        res.json({ message: 'Product deleted successfully' });
      } catch (error: any) {
        res.status(STATUS_CODES.BAD_REQUEST).json({ error: error.message });
      }
  };

  export const getProducts = async (req: Request, res: Response) => {
    try {
      const products = await Product.find().populate('seller', 'username');
      res.json(products);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  };