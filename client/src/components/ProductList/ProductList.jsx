import React from "react";

const ProductList = ({ products }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-h-screen overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-6">Products</h2>
      <ul className="divide-y divide-gray-200">
        {products.map((product) => (
          <li
            key={product.productId}
            className="py-4 flex items-center justify-between"
          >
            <div>
              <p className="text-lg font-semibold">{product.name}</p>
              <p className="text-gray-600">
                ${product.price.toFixed(2)} - {product.company}
              </p>
              <p className="text-yellow-500">
                Rating: {parseFloat(product.rating.$numberDecimal).toFixed(1)}
              </p>
            </div>
            <div>
              {product.featured && (
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  Featured
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
