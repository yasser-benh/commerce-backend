import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  addProductController,
  editProductController,
  deleteProductController,
  getProducts,
} from "../controllers/product.controller";

import multer from "multer";


const productRoutes = express.Router();
const upload = multer({ dest: 'uploads/' });

productRoutes.post('/add' , authMiddleware(['seller']),upload.single("image"), addProductController);
productRoutes.put('/edit/:productId' , authMiddleware(['seller']), editProductController);
productRoutes.delete('/delete/:id' , authMiddleware(['seller' , 'admin']), deleteProductController);
  



productRoutes.get("/", getProducts);

export default productRoutes;
