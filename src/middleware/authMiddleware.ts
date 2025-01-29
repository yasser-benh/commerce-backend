import  { Request , Response , NextFunction} from "express"
import  Jwt  from "jsonwebtoken"
import { STATUS_CODES } from "../constants/STATUS_CODES"

export const authMiddleware = (roles: string[]) => {
     return (req: Request , res:Response ,next:NextFunction):void => {
        if  (!req.user || ! roles.includes(req.user.role)) {

            res.status(STATUS_CODES.UNAUTHORIZED).json({ message: 'Unauthorized' });
      return; }
    const token = req.header("Authorization") ?.replace("Bearer" , "")
    if (!token) {
        res.status(STATUS_CODES.UNAUTHORIZED).json ({message: "Not Authorized"});
        return;
    }

    try {
        const decoded = Jwt.verify(token , process.env.JWT_SECRET!) as {
            userId: string , role:string 
        }
        if(!roles.includes(decoded.role)) 
            res.status (STATUS_CODES.FORBIDDEN).json ({message : "FORBIDDEN"})
            return 
        
            req.user = decoded
        next()
    } catch (error) {
        res.status(STATUS_CODES.BAD_REQUEST).json({message : "Invalid token"})
    }
  }
}