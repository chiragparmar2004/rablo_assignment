import { v4 as uuidv4 } from "uuid";
import sendResponse from "../lib/responseHelper.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";

// Helper function to validate product fields
const validateProductFields = (fields) => {
  const { name, price, company } = fields;
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
    const { name, price, featured, rating, company } = req.body;
    const userId = req.userId;

    const validationError = validateProductFields({
      name,
      price,
      company,
    });
    if (validationError) {
      return sendResponse(res, 400, validationError);
    }

    const productId = uuidv4();
    const newProduct = new Product({
      productId,
      name,
      price,
      featured,
      rating,
      company,
      createdBy: userId,
    });

    await newProduct.save();

    // Update the user's products array
    await User.findByIdAndUpdate(
      userId,
      { $push: { products: newProduct._id } },
      { new: true }
    );

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
    const { name, price, featured, rating, company } = req.body;
    const userId = req.userId;

    const validationError = validateProductFields({
      name,
      price,
      company,
    });
    if (validationError) {
      return sendResponse(res, 400, validationError);
    }

    const product = await Product.findOne({ _id: id, createdBy: userId });
    if (!product) {
      return sendResponse(
        res,
        404,
        "Product not found or you are not authorized to update this product"
      );
    }

    product.name = name;
    product.price = price;
    product.featured = featured;
    product.rating = rating;
    product.company = company;
    await product.save();

    sendResponse(res, 200, "Product updated successfully", product);
  } catch (error) {
    sendResponse(res, 500, error.message);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const product = await Product.findOneAndDelete({
      _id: id,
      createdBy: userId,
    });
    if (!product) {
      return sendResponse(
        res,
        404,
        "Product not found or you are not authorized to delete this product"
      );
    }

    // Update the user's products array
    await User.findByIdAndUpdate(
      userId,
      { $pull: { products: id } },
      { new: true }
    );

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

// New function to fetch products created by the logged-in user
export const fetchMyProducts = async (req, res) => {
  try {
    const userId = req.userId;
    const products = await Product.find({ createdBy: userId });
    sendResponse(res, 200, "Your products retrieved successfully", products);
  } catch (error) {
    sendResponse(res, 500, error.message);
  }
};
