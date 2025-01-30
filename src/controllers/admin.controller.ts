import { Request, Response } from 'express';
import User from '../models/user.model';

export const addAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    user.role = 'admin';
    await user.save();
    res.json({ message: 'User promoted to admin successfully' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    user.role = 'user';
    await user.save();
    res.json({ message: 'User demoted from admin successfully' });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};