"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("../controllers/order.controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const orderRouter = express_1.default.Router();
orderRouter.post('/create', (0, authMiddleware_1.authMiddleware)(["user"]), order_controller_1.createOrderController);
orderRouter.get('/', (0, authMiddleware_1.authMiddleware)(["admin", 'seller']), order_controller_1.getOrdersController);
exports.default = orderRouter;
