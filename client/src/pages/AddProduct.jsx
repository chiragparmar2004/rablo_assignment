import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [featured, setFeatured] = useState(false);
  const [rating, setRating] = useState("");
  const [company, setCompany] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation checks
    if (!name || !price || !company) {
      return toast.error("Please fill in all required fields");
    }
    if (isNaN(Number(price)) || Number(price) <= 0) {
      return toast.error("Price must be a valid number greater than zero");
    }
    if (isNaN(Number(rating)) || Number(rating) < 0 || Number(rating) > 5) {
      return toast.error("Rating must be a number between 0 and 5");
    }

    toast.loading("Adding Product...");

    try {
      const newProduct = {
        name,
        price: parseFloat(price),
        featured,
        rating: parseFloat(rating),
        company,
      };

      // Your API request using axios
      const response = await axios.post("/api/products", newProduct);

      toast.dismiss();
      toast.success("Product added successfully");
      navigate("/");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Error adding product");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-semibold mb-6">Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            step="0.01"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Featured
          </label>
          <input
            type="checkbox"
            className="mt-1"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Rating
          </label>
          <input
            type="number"
            step="0.1"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="0"
            max="5"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Company
          </label>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
