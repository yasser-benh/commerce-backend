import { Request , Response , NextFunction,RequestHandler } from "express";

import  User from "../models/user.model";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { userSchema , loginSchema } from "../schema/user.schema";
import { STATUS_CODES } from "../constants/STATUS_CODES";
import { uploadImage } from "../services/cloudinary.service";

export const registerUser = async ( req : Request , res : Response):Promise<void> => {
    try {
        const { username , email , password , role} = userSchema.parse(req.body)
        const hashedPassword = await bcrypt.hash(password, 8)

        const  file = req.file?.path

        let profileImage = 'default_image_url'

        if (file) {
            const result = await uploadImage(file)
            profileImage = result.secure_url
        }
        const user = new User ({username , email , password: hashedPassword , role , profileImage})
        await user.save()
        res.status(STATUS_CODES.CREATED).json({message: "User Registered Successfully"})

        


        

    } catch (error) {
        res.status(STATUS_CODES.BAD_REQUEST).json ({error: (error as Error).message})
    }
}


 export const loginUser: RequestHandler  = async (req: Request, res: Response, next:NextFunction):Promise<void> => {
    try {
        const {email , password} = loginSchema.parse(req.body)
        
        if (!email || !password) {
            res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Email Or Password are required" })
            return ;
        }
        const user = await User.findOne ({email})
        if (!user) {
            res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Invalid Credentials" })
            return ;
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Invalid Credentials" });
            return 
        }
        const token = jwt.sign ({userId:user._id , role:user.role} , process.env.JWT_SECRET ! , {
            expiresIn:'1h'})
            res.json({token})
    } catch (error) {
        res.status(STATUS_CODES.BAD_REQUEST).json({error: (error as Error).message})
        
    }
}