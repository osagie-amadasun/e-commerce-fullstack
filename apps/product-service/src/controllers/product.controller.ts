import { Request, Response } from "express";
import { Product, productSchema } from "@repo/product-db";

export const createProduct = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const newProduct = await Product.create(data);
    res.status(201).json({
      message: "product created successfully",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create product", details: error });
  }
};
export const updateProduct = async (req: Request, res: Response) => {};
export const deleteProduct = async (req: Request, res: Response) => {};
export const getProducts = async (req: Request, res: Response) => {};
export const getProduct = async (req: Request, res: Response) => {};
