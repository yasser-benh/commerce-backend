"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const product_router_1 = __importDefault(require("./routes/product.router"));
const order_routes_1 = __importDefault(require("./routes/order.routes"));
const admin_router_1 = __importDefault(require("./routes/admin.router"));
function AppRouter(app) {
    app.use('/api/admin', admin_router_1.default);
    app.use('/api/users', user_routes_1.default);
    app.use('/api/products', product_router_1.default);
    app.use('/api/orders', order_routes_1.default);
}
exports.default = AppRouter;
