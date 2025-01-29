import express from 'express';
import { addAdmin, deleteAdmin } from '../controllers/admin.controller'
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/add-admin', authMiddleware(['admin']), addAdmin);
router.post('/delete-admin', authMiddleware(['admin']), deleteAdmin);

export default router;