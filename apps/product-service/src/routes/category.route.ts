import { Request, Response, Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/category.controller";

const router: Router = Router();

router.post("/", createCategory);
router.put("/", updateCategory);
router.delete("/", deleteCategory);
router.get("/", getCategories);

export default router;
