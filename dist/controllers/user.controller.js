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
exports.loginUser = exports.registerUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_schema_1 = require("../schema/user.schema");
const STATUS_CODES_1 = require("../constants/STATUS_CODES");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, role } = user_schema_1.userSchema.parse(req.body);
        const hashedPassword = yield bcryptjs_1.default.hash(password, 8);
        const user = new user_model_1.default({ username, email, password: hashedPassword, role });
        yield user.save();
        res.status(STATUS_CODES_1.STATUS_CODES.CREATED).json({ message: "User Registered Successfully" });
    }
    catch (error) {
        res.status(STATUS_CODES_1.STATUS_CODES.BAD_REQUEST).json({ error: error.message });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = user_schema_1.loginSchema.parse(req.body);
        if (!email || !password) {
            res.status(STATUS_CODES_1.STATUS_CODES.BAD_REQUEST).json({ message: "Email Or Password are required" });
            return;
        }
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            res.status(STATUS_CODES_1.STATUS_CODES.BAD_REQUEST).json({ message: "Invalid Credentials" });
            return;
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(STATUS_CODES_1.STATUS_CODES.BAD_REQUEST).json({ message: "Invalid Credentials" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        res.json({ token });
    }
    catch (error) {
        res.status(STATUS_CODES_1.STATUS_CODES.BAD_REQUEST).json({ error: error.message });
    }
});
exports.loginUser = loginUser;
