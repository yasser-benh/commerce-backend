import express, { Request, Response, NextFunction } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  addProductController,
  editProductController,
  deleteProductController,
  getProducts,
} from "../controllers/product.controller";

const router = express.Router();

router.post(
  "/add",
  authMiddleware(["seller"]),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await addProductController(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/edit/:productId",
  authMiddleware(["seller"]),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await editProductController(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/delete/:productId",
  authMiddleware(["admin", "seller"]),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await deleteProductController(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/", getProducts);

export default router;
