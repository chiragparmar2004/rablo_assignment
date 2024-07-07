import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "../components/ProductList/ProductList";
import FilterSection from "../components/FilterSection/FilterSection";
import apiRequest from "../lib/apiRequest";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiRequest().get("/products/");
        setProducts(response.data.data);
        setFilteredProducts(response.data.data); // Initially, filtered products are the same as all products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleFilteredProducts = (filtered) => {
    console.log("hrere processing");
    console.log(filtered);
    setFilteredProducts(filtered);
    console.log("filterd  ", filteredProducts);
  };

  return (
    <div className="flex flex-wrap h-screen">
      <div className="w-1/3 p-4 h-full">
        <FilterSection setFilteredProducts={handleFilteredProducts} />
      </div>
      <div className="w-2/3 p-4 overflow-y-auto">
        <ProductList products={filteredProducts} />
      </div>
    </div>
  );
};

export default HomePage;
