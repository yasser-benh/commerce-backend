import { Request, Response } from "express";

import { STATUS_CODES } from "../constants/STATUS_CODES";
import Product from "../models/product.model";
import productModel from "../models/product.model";
import { productSchema } from "../schema/product.schema";
import { uploadImage } from "../services/cloudinary.service";

export const addProductController = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category, stock, sellerId } = productSchema.parse(req.body);
    const file = req.file?.path;

    let image = 'default_product_image_url';
    if (file) {
      const result = await uploadImage(file);
      image = result.secure_url;
    }

    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      image,
      sellerId,
    });

    await product.save();

    res.status(STATUS_CODES.CREATED).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(STATUS_CODES.BAD_REQUEST).json({ message: 'Product creation failed', error });
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
      .populate("seller")
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
