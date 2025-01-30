"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersController = exports.createOrderController = void 0;
const order_model_1 = __importDefault(require("../models/order.model"));
const STATUS_CODES_1 = require("../constants/STATUS_CODES");
const order_service_1 = require("../services/order.service");
const createOrderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(STATUS_CODES_1.STATUS_CODES.UNAUTHORIZED).json({ message: "Unauthorized" });
            return;
        }
        console.log("🔍 Order request body:", req.body);
        const { productId, quantity } = req.body;
        const userId = req.user.userId;
        if (!productId || !quantity) {
            res.status(STATUS_CODES_1.STATUS_CODES.BAD_REQUEST).json({ message: "Missing required fields" });
            return;
        }
        const order = yield (0, order_service_1.createOrder)(userId, productId, quantity);
        res.status(STATUS_CODES_1.STATUS_CODES.CREATED).json({ message: "Order created successfully", order });
    }
    catch (error) {
        console.error("❌ Error in createOrderController:", error);
        res.status(STATUS_CODES_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
});
exports.createOrderController = createOrderController;
const getOrdersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_model_1.default.find().populate("user products.product");
        res.json(orders);
    }
    catch (error) {
        res.status(STATUS_CODES_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});
exports.getOrdersController = getOrdersController;
