import express from 'express';
import { addAdmin, deleteAdmin } from '../controllers/admin.controller'
import { authMiddleware } from '../middleware/authMiddleware';

const adminRouter = express.Router();

adminRouter.post('/add-admin', authMiddleware(['admin']), addAdmin);
adminRouter.post('/delete-admin', authMiddleware(['admin']), deleteAdmin);

export default adminRouter;