import React, { useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer.jsx';

export default function Card(props) {
  let options = props.options || {}; // Ensure options is an object
  let priceOptions = Object.keys(options); // Get the keys of the options object
  let dispatch = useDispatchCart();
  let data = useCart();

  // State for quantity and size
  const [qty, setQty] = useState(1); // Default quantity to 1
  const [size, setSize] = useState(priceOptions[0] || ''); // Default size to the first option if available

  // Calculate final price
  let finalPrice = qty * parseInt(options[size] || 0); // Ensure size is valid before accessing options

  // Function to handle adding to cart
  const handleAddToCart = async () => {
    if (!size) {
      alert('Please select a valid size');
      return;
    }
    await dispatch({
      type: 'ADD',
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice, // Using calculated final price
      qty: qty,
      size: size,
    });
    console.log('Cart Data:', data); // Logs current cart state
  };

  return (
    <div>
      <div className="max-w-sm rounded overflow-hidden shadow-lg text-white bg-neutral-900 p-6">
        <img
          className="w-full"
          src={props.imgSrc}
          alt="Card Image"
          style={{ height: '150px', objectFit: 'fill' }}
        />
        <div className="px-1 py-7">
          <h2 className="font-bold text-xl mb-2">{props.foodItem.name}</h2>

          <div className="container w-96">
            {/* Quantity select */}
            <select
              className="m-2 h-6 w-16 bg-green-500 text-white rounded"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            >
              {Array.from({ length: 6 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            {/* Size select */}
            <select
              className="m-2 h-6 w-28 bg-green-500 text-white rounded"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.length > 0 ? (
                priceOptions.map((sizeOption) => (
                  <option key={sizeOption} value={sizeOption}>
                    {sizeOption}
                  </option>
                ))
              ) : (
                <option value="">No Size Available</option>
              )}
            </select>

            {/* Display total price */}
            <div className="inline font-semibold">
              ₹{finalPrice}/-
            </div>
            <hr />

            {/* Add to Cart Button */}
            <button
              className="m-2 h-8 w-28 mt-6 p-1 bg-green-500 text-white rounded"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
