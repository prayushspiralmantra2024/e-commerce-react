import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useProduct from '../../Hooks/useProduct';
import { addToCart } from "../../features/todo/storeSlice";
import { FaStar } from "react-icons/fa6";    

const MensWear = () => {
  const dispatch=useDispatch();
  useProduct();
  const products = useSelector((state) => state.products.items);
  
  const mensProducts = products.filter(
    (product) => product.category === "men's clothing"
  );
  
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <div className="mt-14 mb-12">
    <div className="container">
      {/* Header section */}
      <div className="text-center mb-10 max-w-[600px] mx-auto">
        <p data-aos="fade-up" className="text-sm text-primary">
          Top Selling Products for you
        </p>
        <h1 data-aos="fade-up" className="text-3xl font-bold">
          Products
        </h1>
        <p data-aos="fade-up" className="text-xs text-gray-400">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit
          asperiores modi Sit asperiores modi
        </p>
      </div>
      {/* Body section */}
      <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5">
            {/* Product Cards */}
            {mensProducts && mensProducts.length > 0 ? (
              mensProducts.map((product, index) => (
                <div
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  key={product.id}
                  className="space-y-3 p-4 shadow-md rounded-lg hover:shadow-lg transition"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-[220px] w-[150px] object-cover rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold text-center text-sm">
                      {product.title}
                    </h3>
                    <p className="text-xs text-gray-600 text-center">
                      {product.category}
                    </p>
                    <p className="text-sm font-bold text-center text-primary">
                      ${product.price}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center justify-center gap-1 mt-2">
                      <FaStar className="text-yellow-400" />
                      <span className="text-sm">
                        {product.rating.rate} ({product.rating.count})
                      </span>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="flex justify-center mt-3">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="px-3 py-1 bg-primary text-black bg-white text-sm rounded-md hover:bg-opacity-90"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center">
                {products.length === 0 ? "Loading products..." : "No men's products found."}
              </p>
            )}
          </div>

          {/* View All Button */}
          <div className="flex justify-center mt-10">
            <button className="cursor-pointer bg-primary text-white py-2 px-6 rounded-md hover:bg-opacity-90">
              View All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MensWear;