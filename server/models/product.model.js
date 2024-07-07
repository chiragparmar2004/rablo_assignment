import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: mongoose.Types.Decimal128,
      default: 0.0,
    },
    company: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const Product = mongoose.model("Product", productSchema);
