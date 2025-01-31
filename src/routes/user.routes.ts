import express from 'express';
import {loginUser, registerUser } from '../controllers/user.controller';
import { upload } from '../middleware/upload';
import multer from 'multer';


const userRoutes = express.Router();

const update = multer({ dest: 'uploads/' });

userRoutes.post('/register', upload.single('profileImage') , registerUser);
userRoutes.post("/login" , loginUser)




export default userRoutes;