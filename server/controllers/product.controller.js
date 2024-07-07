import sendResponse from "../lib/responseHelper.js";
import { Product } from "../models/product.model.js";

// Helper function to validate product fields
const validateProductFields = (fields) => {
  const { productId, name, price, company } = fields;
  if (!productId || typeof productId !== "string") {
    return "Product ID is required and must be a string";
  }
  if (!name || typeof name !== "string") {
    return "Name is required and must be a string";
  }
  if (price == null || typeof price !== "number") {
    return "Price is required and must be a number";
  }
  if (!company || typeof company !== "string") {
    return "Company is required and must be a string";
  }
  return null;
};

export const addProduct = async (req, res) => {
  try {
    const { productId, name, price, featured, rating, createdAt, company } =
      req.body;

    const validationError = validateProductFields({
      productId,
      name,
      price,
      company,
    });
    if (validationError) {
      return sendResponse(res, 400, validationError);
    }

    const newProduct = await Product.create({
      productId,
      name,
      price,
      featured,
      rating,
      createdAt,
      company,
    });
    sendResponse(res, 201, "Product created successfully", newProduct);
  } catch (error) {
    sendResponse(res, 500, error.message);
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    sendResponse(res, 200, "Products retrieved successfully", products);
  } catch (error) {
    sendResponse(res, 500, error.message);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { productId, name, price, featured, rating, createdAt, company } =
      req.body;

    const validationError = validateProductFields({
      productId,
      name,
      price,
      company,
    });
    if (validationError) {
      return sendResponse(res, 400, validationError);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { productId, name, price, featured, rating, createdAt, company },
      { new: true }
    );
    if (!updatedProduct) {
      return sendResponse(res, 404, "Product not found");
    }
    sendResponse(res, 200, "Product updated successfully", updatedProduct);
  } catch (error) {
    sendResponse(res, 500, error.message);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return sendResponse(res, 404, "Product not found");
    }
    sendResponse(res, 200, "Product deleted successfully");
  } catch (error) {
    sendResponse(res, 500, error.message);
  }
};

export const fetchFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await Product.find({ featured: true });
    sendResponse(
      res,
      200,
      "Featured products retrieved successfully",
      featuredProducts
    );
  } catch (error) {
    sendResponse(res, 500, error.message);
  }
};

export const fetchProductsByPrice = async (req, res) => {
  try {
    const { value } = req.params;
    if (isNaN(value)) {
      return sendResponse(res, 400, "Price value must be a number");
    }
    const products = await Product.find({ price: { $lt: value } });
    sendResponse(
      res,
      200,
      `Products with price less than ${value} retrieved successfully`,
      products
    );
  } catch (error) {
    sendResponse(res, 500, error.message);
  }
};

export const fetchProductsByRating = async (req, res) => {
  try {
    const { value } = req.params;
    if (isNaN(value)) {
      return sendResponse(res, 400, "Rating value must be a number");
    }
    const products = await Product.find({ rating: { $gt: value } });
    sendResponse(
      res,
      200,
      `Products with rating higher than ${value} retrieved successfully`,
      products
    );
  } catch (error) {
    sendResponse(res, 500, error.message);
  }
};
