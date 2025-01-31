import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'seller' | 'admin';
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'seller', 'admin'], default: 'user' },
    profileImage: { type: String, default: 'default_image_url' },
  },
  { timestamps: true }
);

export default mongoose.model<User>('User', UserSchema);
