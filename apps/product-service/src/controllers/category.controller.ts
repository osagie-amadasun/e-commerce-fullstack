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
export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    // Check if category exists first
    const existingCategory = await Category.findById(id).exec();
    if (!existingCategory) {
      return res.status(404).json({
        message: `Category '${id}' not found`,
      });
    }

    // If slug is being updated, check for duplicates
    if (data.slug && data.slug !== existingCategory.slug) {
      const duplicateSlug = await Category.findOne({
        slug: data.slug,
        _id: { $ne: id },
      }).exec();

      if (duplicateSlug) {
        return res.status(409).json({
          message: `Category with slug '${data.slug}' already exists`,
        });
      }
    }

    // Update the category
    const category = await Category.findByIdAndUpdate(id, data, {
      new: true, // Return updated document
      runValidators: true, // Run schema validation
    }).exec();

    return res.status(200).json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Failed to update category",
      details: error,
    });
  }
};
export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    return res.status(404).json({ error: "Category not found :(" });
  }
  res.status(200).json({
    message: "category deleted successfully! :D",
    data: category,
  });
};
export const getCategories = async (req: Request, res: Response) => {
  const categories = await Category.find();
  res.status(200).json({
    message: "categories retrieved successfully",
    data: categories,
  });
};
