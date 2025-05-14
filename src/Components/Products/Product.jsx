import React, { useEffect } from "react";

import { FaStar } from "react-icons/fa6";
import Cart from "../Carts/Cart";
import {useDispatch, useSelector} from 'react-redux';

import useProduct from "../../Hooks/useProduct";
import { useState } from "react";

import { addToCart, removeFromCart } from '../../features/todo/storeSlice';

const Products = () => {
  const dispatch = useDispatch();
  useProduct();

  const products = useSelector((state) => state.products.items);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [visibleProducts, setVisibleProducts] = useState(5);
  const productsToShow = products.slice(0, visibleProducts);
  
  const handleLoadMore = () => {
    setVisibleProducts(prev => Math.min(prev + 5, products.length));
  };

  // Store the ID of the product that was just added
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setSelectedProductId(product.id); // set the selected product
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));

    const cartItem = cartItems.find(item => item.id === id);
    if (!cartItem || cartItem.quantity <= 1) {
      // If item is no longer in cart, reset selectedProductId
      setSelectedProductId(null);
    }
  };

  return (
    <div className="mt-14 mb-12">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p className="text-sm text-primary">Top Selling Products for you</p>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-xs text-gray-400">Check out our awesome range of items!</p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5">
          {products && products.length > 0 ? (
            productsToShow.map((product, index) => {
              const cartItem = cartItems.find(item => item.id === product.id);
              const isSelected = selectedProductId === product.id;

              return (
                <div
                  key={product.id}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="space-y-3 p-4 shadow-md rounded-lg hover:shadow-lg transition"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-[220px] w-[150px] object-cover rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold text-center text-sm">{product.title}</h3>
                    <p className="text-xs text-gray-600 text-center">{product.category}</p>
                    <p className="text-sm font-bold text-center text-primary">${product.price}</p>

                    {/* Rating */}
                    <div className="flex items-center justify-center gap-1 mt-2">
                      <FaStar className="text-yellow-400" />
                      <span className="text-sm">{product.rating.rate} ({product.rating.count})</span>
                    </div>

                    {/* Add/Remove UI based on selected product ID */}
                    {isSelected ? (
                      <div className="flex justify-center items-center gap-3 mt-3">
                        <button
                          onClick={() => handleRemoveFromCart(product.id)}
                          className="px-2 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600"
                        >
                          -
                        </button>
                        <span className="text-sm font-semibold text-black">
                          {cartItem?.quantity || 0}
                        </span>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="px-2 py-1 bg-green-500 text-white text-sm rounded-md hover:bg-green-600"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-center mt-3">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="px-3 py-1 bg-primary text-black bg-white text-sm rounded-md hover:bg-opacity-90"
                        >
                          Add to Cart
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="col-span-full text-center">Loading products...</p>
          )}
        </div>
        {visibleProducts < products.length && (
        <div className="text-center">
          <button 
            onClick={handleLoadMore} 
            className="bg-gray-800 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors font-medium"
          >
            Load More Products
          </button>
        </div>  )}
      </div>
    </div>
  );
};

export default Products;
