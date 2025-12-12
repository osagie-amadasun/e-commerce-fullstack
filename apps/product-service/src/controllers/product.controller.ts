import { Request, Response } from "express";
import { Category, Product, productSchema } from "@repo/product-db";

export const createProduct = async (req: Request, res: Response) => {
  const { category: categorySlug, ...productData } = req.body;
  const { colors, images } = productData;

  try {
    if (!colors || !Array.isArray(colors) || colors.length === 0) {
      return res.status(400).json({
        message: "Colors array is required and should not be empty!",
      });
    }
    if (!images || typeof images !== "object") {
      return res.status(400).json({
        message: "Images object is required!",
      });
    }
    const missingColors = colors.filter((color) => !(color in images));

    if (missingColors.length > 0) {
      return res.status(400).json({
        message: `Images are missing for the following colors: ${missingColors.join(
          ", "
        )}`,
      });
    }
    // --- SLUG TO ID TRANSFORMATION ---
    // 2. Find the Category document using the unique slug
    const categoryDoc = await Category.findOne({ slug: categorySlug });
    // 3. Handle the case where the slug doesn't exist
    if (!categoryDoc) {
      return res.status(404).json({
        message: `Category '${categorySlug}' not found. Please provide a valid slug.`,
      });
    }
    // 4. Construct the final data object, replacing the slug with the required _id
    const dataForMongoose = {
      ...productData,
      category: categoryDoc._id, // ⬅️ This is the crucial transformation
    };
    const newProduct = await Product.create(dataForMongoose);
    return res.status(201).json({
      message: "product created successfully! :D",
      data: newProduct,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to create product :(", details: error });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findById(id)
    .populate("category") // Optional: populate category details
    .exec();

  if (!product) {
    return res.status(404).json({ message: `Product '${id}' not found` });
  }

  return res.status(200).json({
    message: "Product updated successfully! :D",
    data: product,
  });
};
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return res.status(404).json({ message: `Product '${id}' not found` });
  }

  return res.status(200).json({
    message: "Product deleted successfully! :D",
    data: product,
  });
};
export const getProducts = async (req: Request, res: Response) => {
  const { sort, category, search, limit } = req.query;

  const orderBy: any = (sort?: string) => {
    switch (sort) {
      case "asc":
        return { price: 1 };
      case "desc":
        return { price: -1 };
      case "oldest":
        return { createdAt: 1 };
      default:
        return { createdAt: -1 };
    }
  };

  try {
    // Build query object
    const query: any = {};

    // Handle category filter
    if (category) {
      const categoryDoc = await Category.findOne({ slug: category as string });
      if (!categoryDoc) {
        return res.status(404).json({
          message: `Category '${category}' not found`,
        });
      }
      query.category = categoryDoc._id;
    }

    // Handle search filter (case-insensitive)
    if (search) {
      query.name = {
        $regex: search as string,
        $options: "i", // case insensitive
      };
    }

    // Execute query with sorting and limit
    const products = await Product.find(query)
      .sort(orderBy(sort as string))
      .limit(limit ? Number(limit) : 0)
      .populate("category") // Optional: populate category details
      .exec();

    res.status(200).json({
      message: "Products retrieved successfully! :D",
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Failed to fetch products :(",
      details: error,
    });
  }
};
export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findById(id)
    .populate("category") // Optional: populate category details
    .exec();

  if (!product) {
    return res.status(404).json({ message: `Product '${id}' not found` });
  }

  return res.status(200).json({
    message: "Product retrieved successfully! :D",
    data: product,
  });
};
