import React, { useState, useEffect } from "react";
import axios from "axios";
import apiRequest from "../lib/apiRequest";
import toast, { Toaster } from "react-hot-toast";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    featured: false,
    rating: "",
    company: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiRequest().get("/products/myProducts");
        setProducts(response.data.data);
        toast.success("Products loaded successfully!");
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products.");
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await apiRequest().delete(`/products/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
      toast.success("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product.");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product._id);
    setForm({
      name: product.name,
      price: product.price,
      featured: product.featured,
      rating: product.rating.$numberDecimal,
      company: product.company,
    });
  };

  const handleUpdate = async () => {
    try {
      const updatedProduct = await apiRequest().put(
        `/products/${editingProduct}`,
        {
          ...form,
          rating: parseFloat(form.rating),
        }
      );
      setProducts(
        products.map((product) =>
          product._id === editingProduct ? updatedProduct.data.data : product
        )
      );
      setEditingProduct(null);
      setForm({
        name: "",
        price: "",
        featured: false,
        rating: "",
        company: "",
      });
      toast.success("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <Toaster />
      <h2 className="text-2xl font-bold mb-6">My Products</h2>
      <ul className="divide-y divide-gray-200">
        {products.map((product) => (
          <li key={product._id} className="py-4 flex flex-col space-y-2">
            {editingProduct === product._id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Product Name"
                  className="border p-2 w-full rounded-md"
                />
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Product Price"
                  className="border p-2 w-full rounded-md"
                />
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Company"
                  className="border p-2 w-full rounded-md"
                />
                <input
                  type="number"
                  name="rating"
                  value={form.rating}
                  onChange={handleChange}
                  placeholder="Rating"
                  step="0.1"
                  className="border p-2 w-full rounded-md"
                />
                <label className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={form.featured}
                    onChange={handleChange}
                    className="form-checkbox"
                  />
                  <span>Featured</span>
                </label>
                <div className="flex space-x-2">
                  <button
                    onClick={handleUpdate}
                    className="bg-blue-500 text-white p-2 rounded-md"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setEditingProduct(null)}
                    className="bg-gray-500 text-white p-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-1">
                <p className="text-lg font-semibold">{product.name}</p>
                <p className="text-gray-600">
                  ${product.price} - {product.company}
                </p>
                <p className="text-gray-600">
                  Rating: {product.rating.$numberDecimal}
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-yellow-500 text-white p-2 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white p-2 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyProducts;
