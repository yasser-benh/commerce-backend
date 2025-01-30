import express from 'express';
import { createOrderController, getOrdersController } from '../controllers/order.controller';
import { authMiddleware } from '../middleware/authMiddleware';


const orderRouter = express.Router();

orderRouter.post('/create', authMiddleware(["user"]), createOrderController);
orderRouter.get('/', authMiddleware(["admin" , 'seller']), getOrdersController);

export default orderRouter;