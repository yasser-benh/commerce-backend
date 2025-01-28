import  { Request , Response , NextFunction} from "express"
import  Jwt  from "jsonwebtoken"
import { STATUS_CODES } from "../constants/STATUS_CODES"

export const authMiddleware = (roles: string[]) => (req: Request , res:Response ,next:NextFunction)=> {
    const token = req.header("Authorization") ?.replace("Bearer" , "")
    if (!token) 
        return res.status(STATUS_CODES.UNAUTHORIZED).json ({message: "Not Authorized"})

    try {
        const decoded = Jwt.verify(token , process.env.JWT_SECRET!) as {
            userId: string , role:string 
        }
        if(!roles.includes(decoded.role)) 
            return res.status (STATUS_CODES.FORBIDDEN).json ({message : "FORBIDDEN"})
        
            req.user = decoded
        next()
    } catch (error) {
        res.status(STATUS_CODES.BAD_REQUEST).json({message : "Invalid token"})
        
    }
}