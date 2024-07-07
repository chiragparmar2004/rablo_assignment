import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  fetchFeaturedProducts,
  fetchProductsByPrice,
  fetchProductsByRating,
  fetchMyProducts,
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/addProduct", authMiddleware, addProduct);

router.get("/", getAllProducts);

router.put("/:id", authMiddleware, updateProduct);

router.delete("/:id", authMiddleware, deleteProduct);

router.get("/featured", fetchFeaturedProducts);

router.get("/price/:value", fetchProductsByPrice);

router.get("/rating/:value", fetchProductsByRating);

router.get("/myProducts", authMiddleware, fetchMyProducts);

export default router;
