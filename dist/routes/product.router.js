"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const product_controller_1 = require("../controllers/product.controller");
const upload_1 = require("../middleware/upload");
const productRoutes = express_1.default.Router();
productRoutes.post('/add', (0, authMiddleware_1.authMiddleware)(['seller']), upload_1.upload.single("image"), product_controller_1.addProductController);
productRoutes.put('/edit/:productId', (0, authMiddleware_1.authMiddleware)(['seller']), product_controller_1.editProductController);
productRoutes.delete('/delete/:id', (0, authMiddleware_1.authMiddleware)(['seller', 'admin']), product_controller_1.deleteProductController);
productRoutes.get("/", product_controller_1.getProducts);
exports.default = productRoutes;
