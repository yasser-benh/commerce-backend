import { Express } from "express";
import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/product.router";
import orderRouter from "./routes/order.routes";
import adminRouter from "./routes/admin.router";


function AppRouter (app:Express) { 
    app.use ('/api/admin' , adminRouter)
    app.use('/api/users' , userRoutes)
    app.use('/api/products' , productRoutes)
    app.use('/api/orders' , orderRouter)
}
export default AppRouter