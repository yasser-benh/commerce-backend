import { Request , Response } from "express";
import  User from "../models/user.model";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { userSchema , loginSchema } from "../schema/user.schema";
import { STATUS_CODES } from "../constants/STATUS_CODES";

export const registerUser = async ( req : Request , res : Response) => {
    try {
        const { username , email , password , role} = userSchema.parse(req.body)
        const hashedPassword = await bcrypt.hash(password, 8)
        const user = new User ({username , email , password: hashedPassword , role})
        await user.save()
        res.status(STATUS_CODES.CREATED).json({message: "User Registered Successfully"})

    } catch (error:any) {
        res.status(STATUS_CODES.BAD_REQUEST).json ({error: error.message})
    }
}


export const loginUser = async ( req :Request , res: Response) => {
    try {
        const {email , password} = loginSchema.parse(req.body)

        if (!email || !password) {
            return res.status(STATUS_CODES.BAD_REQUEST).json ({message: "Email Or Password are required"})
        }
        const user = await User.findOne ({email})
        if (!user) 
            return res.status (STATUS_CODES.BAD_REQUEST).json ({message : "Invalid Credentials"})

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) 
            return res.status (STATUS_CODES.BAD_REQUEST).json ({message : "Invalid Credentials"})

        const token = jwt.sign ({userId:user._id , role: user.role} , process.env.JWT_SECRET! , {
            expiresIn:'1h'})
            res.json({token})
    } catch (error:any) {
        res.status(STATUS_CODES.BAD_REQUEST).json({error: error.message})
        
    }
}