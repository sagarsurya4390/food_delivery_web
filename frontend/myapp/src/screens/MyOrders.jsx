import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrders() {
  const [orderData, setOrderData] = useState({});

  const fetchMyOrder = async () => {
    const userEmail = localStorage.getItem('userEmail');
    console.log(userEmail);

    if (!userEmail) {
      console.log("No user email found in localStorage");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/myOrderData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch order data');
      }

      const data = await response.json();
      setOrderData(data);
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 mt-8">
        <div className="grid gap-4">
          {orderData && orderData.orderData && orderData.orderData.order_data.length > 0
            ? orderData.orderData.order_data
                .slice(0) // Reversing the order
                .reverse()
                .map((order, index) => (
                  <div key={index} className="mb-8">
                    {/* Order Date */}
                    {order[0]?.Order_date && (
                      <div className="text-lg font-semibold mb-4 text-center">
                        Order Date: {new Date(order[0].Order_date).toLocaleDateString()}
                        <hr className="border-t border-gray-300 mt-2" />
                      </div>
                    )}
                    {/* Order Items */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {order.map((item, i) => (
                        <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                         
                          <div className="p-4">
                            <h5 className="font-bold text-lg">{item.name}</h5>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-sm text-gray-500">Qty: {item.qty}</span>
                              <span className="text-sm text-gray-500">Size: {item.size}</span>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-sm text-gray-500">Price:</span>
                              <span className="text-lg font-bold text-gray-800">
                                ₹{item.price}/-
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
            : (
              <div className="text-center text-gray-500">
                No orders found. Please place an order to see your history.
              </div>
            )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
