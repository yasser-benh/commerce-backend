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
exports.getProducts = exports.deleteProductController = exports.editProductController = exports.addProductController = void 0;
const product_service_1 = require("../services/product.service");
const STATUS_CODES_1 = require("../constants/STATUS_CODES");
const product_model_1 = __importDefault(require("../models/product.model"));
const addProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("test", req.user, req.file);
        if (!req.user) {
            res.status(STATUS_CODES_1.STATUS_CODES.UNAUTHORIZED).json({ message: "Unauthorized" });
            return;
        }
        const { name, price, description } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : "";
        const sellerId = req.user.userId;
        const product = yield (0, product_service_1.addProduct)(sellerId, name, price, description, image);
        res.status(STATUS_CODES_1.STATUS_CODES.CREATED).json({ message: "Product added successfully", product });
    }
    catch (error) {
        res.status(STATUS_CODES_1.STATUS_CODES.BAD_REQUEST).json({ error: error.message });
    }
});
exports.addProductController = addProductController;
const editProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(STATUS_CODES_1.STATUS_CODES.UNAUTHORIZED).json({ message: "Unauthorized" });
            return;
        }
        const { productId } = req.params;
        const { name, price, description } = req.body;
        const sellerId = req.user.userId;
        const product = yield product_model_1.default.findOne({ _id: productId, seller: sellerId });
        if (!product) {
            res
                .status(STATUS_CODES_1.STATUS_CODES.NOT_FOUND)
                .json({ message: "Product not found or unauthorized" });
            return;
        }
        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        yield product.save();
        res.json({ message: "Product updated successfully", product });
    }
    catch (error) {
        res
            .status(STATUS_CODES_1.STATUS_CODES.BAD_REQUEST)
            .json({ error: error.message });
    }
});
exports.editProductController = editProductController;
const deleteProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(STATUS_CODES_1.STATUS_CODES.UNAUTHORIZED).json({ message: "Unauthorized" });
            return;
        }
        const { productId } = req.params;
        const sellerId = req.user.userId;
        const product = yield product_model_1.default.findOneAndDelete({
            _id: productId,
            seller: sellerId,
        });
        if (!product) {
            res
                .status(STATUS_CODES_1.STATUS_CODES.NOT_FOUND)
                .json({ message: "Product not found or unauthorized" });
            return;
        }
        res.json({ message: "Product deleted successfully" });
    }
    catch (error) {
        res
            .status(STATUS_CODES_1.STATUS_CODES.BAD_REQUEST)
            .json({ error: error.message });
    }
});
exports.deleteProductController = deleteProductController;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const products = yield product_model_1.default.find()
            .populate("seller", "username")
            .skip(skip)
            .limit(limit);
        const totalProducts = yield product_model_1.default.countDocuments();
        res.json({
            products,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: page,
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getProducts = getProducts;
