import mongoose, { Document, Schema } from 'mongoose';

export interface Product extends Document {
  name: string;
  price: number;
  description: string;
  seller: mongoose.Types.ObjectId;
  image: string;
  category: string;
  stock: number;
}

const productSchema = new Schema<Product>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  image: { type: String, default: 'default_image_url' },
  category: { type: String, required: true },
  stock: { type: Number, default: 0 },
  description: { type: String, required: true },
  
});

export default mongoose.model<Product>('Product', productSchema);