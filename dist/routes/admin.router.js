"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controllers/admin.controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const adminRouter = express_1.default.Router();
adminRouter.post('/add-admin', (0, authMiddleware_1.authMiddleware)(['admin']), admin_controller_1.addAdmin);
adminRouter.post('/delete-admin', (0, authMiddleware_1.authMiddleware)(['admin']), admin_controller_1.deleteAdmin);
exports.default = adminRouter;
