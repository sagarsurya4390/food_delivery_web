import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();

  // If the cart is empty
  if (data.length === 0) {
    return (
      <div className="m-5 w-full text-center text-3xl font-semibold">
        The Cart is Empty!
      </div>
    );
  }

  // Checkout handler
 
  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail")
    let response = await fetch("http://localhost:5000/api/orderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    })

    if (response.status === 200) {
      dispatch({ type: "DROP" })
    }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0)

  return (
    <div className="flex flex-col items-center justify-center mt-5 w-full bg-white">
      <div className="container mx-auto mt-5 overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead className="bg-green-600 text-white text-lg">
            <tr>
              <th className="p-4">#</th>
              <th className="p-4">Name</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Option</th>
              <th className="p-4">Amount</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{food.name}</td>
                <td className="p-4">{food.qty}</td>
                <td className="p-4">{food.size}</td>
                <td className="p-4">₹{food.price * food.qty}</td>
                <td className="p-4">
                  <button
                    type="button"
                    className="text-red-600 hover:text-red-800"
                    onClick={() => {
                      dispatch({ type: 'REMOVE', index: index });
                    }}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total Price Section */}
        <div className="flex justify-between items-center mt-5 w-full bg-white">
          <h1 className="text-2xl font-bold text-gray-800">
            Total Price: ₹{totalPrice}/-
          </h1>
          <button
            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
            onClick={handleCheckOut}
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}
