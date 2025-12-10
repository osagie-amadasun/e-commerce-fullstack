import mongoose, { InferSchemaType } from "mongoose";
const { Schema } = mongoose;

export const orderStatus = ["success", "failed"] as const;

const orderSchema = new Schema(
  {
    userId: { type: String, required: true, ref: "User" },
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true, enum: orderStatus },
    address: { type: String, required: true },
    shippingAddress: { type: String, required: true },
    products: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

export type orderSchemaType = InferSchemaType<typeof orderSchema>;

export const Order = mongoose.model<orderSchemaType>("Order", orderSchema);
