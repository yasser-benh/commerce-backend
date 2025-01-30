import mongoose from "mongoose";
import { Schema } from "mongoose";

export interface Order extends mongoose.Document {
  user: mongoose.Schema.Types.ObjectId;
  products: { product: mongoose.Schema.Types.ObjectId; quantity: number }[];
  totalAmount: number;
  status: "pending" | "completed" | "cancelled";
  createdAt: Date;
}

const orderSchema = new Schema<Order>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" , required: true },
      quantity: { type: Number , required: true , min: 1},
    },
  ],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "completed", "cancelled"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });


export default mongoose.model<Order>("Order", orderSchema);
