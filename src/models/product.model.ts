import mongoose, { Document, Schema } from 'mongoose';

export interface Product extends Document {
  name: string;
  price: number;
  description: string;
  seller: mongoose.Types.ObjectId;
}

const productSchema = new Schema<Product>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  seller: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

export default mongoose.model<Product>('Product', productSchema);