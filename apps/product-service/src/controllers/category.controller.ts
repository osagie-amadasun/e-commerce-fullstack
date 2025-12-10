import { Request, Response } from "express";
import { Category } from "@repo/product-db";

export const createCategory = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const newCategory = await Category.create(data);
    res.status(201).json({
      message: "category created successfully",
      data: newCategory,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to create category", details: error });
  }
};
export const updateCategory = async (req: Request, res: Response) => {};
export const deleteCategory = async (req: Request, res: Response) => {};
export const getCategories = async (req: Request, res: Response) => {};
