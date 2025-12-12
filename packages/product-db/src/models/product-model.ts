import mongoose, { InferSchemaType } from "mongoose";
import { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    sizes: { type: [String], default: [], required: true },
    colors: { type: [String], default: [], required: true },
    images: { type: Object, default: {}, required: true },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

export type productSchema = InferSchemaType<typeof ProductSchema>;

export const Product = mongoose.model<productSchema>("Product", ProductSchema);
