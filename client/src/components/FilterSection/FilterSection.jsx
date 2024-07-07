import React, { useState } from "react";
import axios from "axios";
import apiRequest from "../../lib/apiRequest";

const FilterSection = ({ setFilteredProducts }) => {
  const [priceFilter, setPriceFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

  const handlePriceFilterChange = (e) => {
    setPriceFilter(e.target.value);
  };

  const handleRatingFilterChange = (e) => {
    setRatingFilter(e.target.value);
  };

  const handleFetchFeatured = async () => {
    console.log("jere");
    try {
      const response = await apiRequest().get("/products/featured");
      console.log(response.data.data);
      setFilteredProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching featured products:", error);
    }
  };

  const handleFetchByPrice = async () => {
    try {
      const response = await apiRequest().get(`/products/price/${priceFilter}`);
      setFilteredProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products by price:", error);
    }
  };

  const handleFetchByRating = async () => {
    try {
      const response = await apiRequest().get(
        `/products/rating/${ratingFilter}`
      );
      setFilteredProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products by rating:", error);
    }
  };

  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-6  flex flex-col   ">
      <h2 className="text-2xl font-semibold mb-6">Filters</h2>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price less than:
        </label>
        <input
          type="number"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter price"
          value={priceFilter}
          onChange={handlePriceFilterChange}
        />
        <button
          className="mt-2 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleFetchByPrice}
        >
          Apply Price Filter
        </button>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rating higher than:
        </label>
        <input
          type="number"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter rating"
          value={ratingFilter}
          onChange={handleRatingFilterChange}
        />
        <button
          className="mt-2 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleFetchByRating}
        >
          Apply Rating Filter
        </button>
      </div>
      <div className="mb-6">
        <button
          className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          onClick={handleFetchFeatured}
        >
          Fetch Featured Products
        </button>
      </div>
    </div>
  );
};

export default FilterSection;
