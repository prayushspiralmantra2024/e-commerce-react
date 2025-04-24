import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../features/todo/storeSlice';
import { FaStar } from "react-icons/fa6";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleAddToCart = (data) => {
    const payload = { ...data };
    dispatch(addToCart(payload));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="mt-14 mb-12">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p className="text-sm text-primary">Your Shopping Cart</p>
          <h1 className="text-3xl font-bold">Cart Items</h1>
          <p className="text-xs text-gray-400">
            Review your selected products below
          </p>
        </div>

        {/* Cart Items */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div
                key={item.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="space-y-3 p-4 shadow-md rounded-lg hover:shadow-lg transition bg-white"
              >
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-[220px] w-[150px] object-cover rounded-md mx-auto"
                />

                {/* Item Details */}
                <div>
                  <h3 className="font-semibold text-center text-sm text-black">{item.title}</h3>
                  <p className="text-xs  text-center text-black">{item.category}</p>
                  <p className="text-sm font-bold text-center text-primary text-black">
  ${ (item.price * item.quantity).toFixed(2) }
</p>


                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <FaStar className="text-yellow-400" />
                    <span className="text-sm">{item.rating?.rate || 5.0}</span>
                  </div>

                  {/* Quantity Control */}
                  <div className="flex justify-center items-center gap-3 mt-3">
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="px-2 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600"
                    >
                      -
                    </button>
                    <span className="text-sm font-semibold text-black">{item.quantity}</span>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="px-2 py-1 bg-green-500 text-white text-sm rounded-md hover:bg-green-600"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center">Your cart is empty.</p>
          )}
        </div>

        {/* Total Price */}
        {cartItems.length > 0 && (
          <div className="flex justify-center mt-8">
            <p className="text-xl font-semibold text-primary">
              Total: ${totalPrice.toFixed(2)}
            </p>
          </div>
        )}

        {/* Checkout Button */}
        {cartItems.length > 0 && (
          <div className="flex justify-center mt-4">
            <button className="cursor-pointer bg-primary text-white py-2 px-6 rounded-md hover:bg-opacity-90">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
