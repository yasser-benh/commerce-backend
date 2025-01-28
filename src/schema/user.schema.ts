import { z } from 'zod';

export const userSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['user', 'seller', 'admin']).optional()
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});