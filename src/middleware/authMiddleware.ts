import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (roles: string[]) => (req: Request, res: Response, next: NextFunction):void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    res.status(401).json({ message: 'Access denied' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; role: string };
    if (!roles.includes(decoded.role)) {
      res.status(403).json({ message: 'Permission denied' });
      return;
    }

    req.user = decoded; 
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};