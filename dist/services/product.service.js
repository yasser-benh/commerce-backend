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
exports.deleteProduct = exports.editProduct = exports.addProduct = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const addProduct = (sellerId, name, price, description, image) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = new product_model_1.default({ name, price, description, seller: sellerId, image });
    return yield newProduct.save();
});
exports.addProduct = addProduct;
const editProduct = (sellerId, productId, name, price, description) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.default.findOne({ _id: productId, seller: sellerId });
    if (!product)
        throw new Error('Product not found or unauthorized');
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    yield product.save();
    return product;
});
exports.editProduct = editProduct;
const deleteProduct = (sellerId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.default.findOneAndDelete({ _id: productId, seller: sellerId });
    if (!product)
        throw new Error('Product not found or unauthorized');
    return product;
});
exports.deleteProduct = deleteProduct;
