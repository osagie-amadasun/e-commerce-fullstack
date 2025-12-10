import mongoose, { InferSchemaType } from "mongoose";
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export type categorySchema = InferSchemaType<typeof categorySchema>;

export const Category = mongoose.model<categorySchema>(
  "Category",
  categorySchema
);
