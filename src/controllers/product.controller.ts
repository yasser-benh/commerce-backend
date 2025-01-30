import { Request, Response } from "express";
import {
  addProduct,
} from "../services/product.service";
import { STATUS_CODES } from "../constants/STATUS_CODES";
import Product from "../models/product.model";
import productModel from "../models/product.model";

export const addProductController = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log( "test" ,req.user , req.file);
    if (!req.user) {
      res.status(STATUS_CODES.UNAUTHORIZED).json({ message: "Unauthorized" });
      return;
    }

    const { name, price, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";
    const sellerId = (req as any).user.userId;

    const product = await addProduct(sellerId, name, price, description, image);

    res.status(STATUS_CODES.CREATED).json({ message: "Product added successfully", product });
  } catch (error: any) {
    res.status(STATUS_CODES.BAD_REQUEST).json({ error: error.message });
  }
};

export const editProductController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(STATUS_CODES.UNAUTHORIZED).json({ message: "Unauthorized" });
      return;
    }

    const { productId } = req.params;
    const { name, price, description } = req.body;
    const sellerId = req.user.userId;

    const product = await productModel.findOne({ _id: productId, seller: sellerId });
    if (!product) {
      res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: "Product not found or unauthorized" });
      return;
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    await product.save();

    res.json({ message: "Product updated successfully", product });
  } catch (error) {
    res
      .status(STATUS_CODES.BAD_REQUEST)
      .json({ error: (error as Error).message });
  }
};
export const deleteProductController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(STATUS_CODES.UNAUTHORIZED).json({ message: "Unauthorized" });
      return;
    }

    const { productId } = req.params;
    const sellerId = req.user.userId;

    const product = await Product.findOneAndDelete({
      _id: productId,
      seller: sellerId,
    });
    if (!product) {
      res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: "Product not found or unauthorized" });
      return;
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(STATUS_CODES.BAD_REQUEST)
      .json({ error: (error as Error).message });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find()
      .populate("seller", "username")
      .skip(skip)
      .limit(limit);
    const totalProducts = await Product.countDocuments();

    res.json({
      products,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
