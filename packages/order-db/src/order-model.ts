import mongoose, { InferSchemaType } from "mongoose";
const { Schema } = mongoose;

export const orderStatus = ["success", "failed"] as const;

const orderShcema = new Schema(
  {
    userId: { type: String, required: true },
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true, enum: orderStatus },
    address: { type: String, required: true },
    shippingAddress: { type: String, required: true },
    products: {
      type: [
        {
          name: { type: String, required: true },
          quantity: { type: Number, required: true },
          price: { type: Number, required: true },
        },
      ],
    },
  },
  { timestamps: true }
);

export type orderSchemaType = InferSchemaType<typeof orderShcema>;

export const Order = mongoose.model<orderSchemaType>("Order", orderShcema);