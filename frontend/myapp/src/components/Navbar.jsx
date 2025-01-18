import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Modal from "../components/Model"; // Import Modal component
import Cart from "../screens/Cart"; // Import Cart component

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartCount, setCartCount] = useState(0); // State to store cart count
  const [cartView, setCartView] = useState(false); // State to control cart modal
  const navigate = useNavigate();

  // Check token on component mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  // Fetch cart items count
  useEffect(() => {
    const updateCartCount = () => {
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      setCartCount(cartItems.length);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
    };
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/");
  };

  // Function to open cart modal
  const loadCart = () => {
    setCartView(true);
  };

  return (
    <div className="bg-purple-800 h-16 text-white">
      <div className="flex items-center justify-between px-6">
        {/* Brand and Navigation Links */}
        <ul className="flex gap-10 items-center mt-3">
          <li className="text-4xl font-bold font-mono italic">BeFoody</li>
          <li>
            <Link className="text-xl" to="/">
              Home
            </Link>
          </li>
          {isAuthenticated && (
            <li>
              <Link className="text-xl" to="/orders">
                My Orders
              </Link>
            </li>
          )}
        </ul>

        {/* Auth Buttons and Cart with Badge */}
        {!isAuthenticated ? (
          <div className="flex gap-5 mt-3">
            <Link
              className="bg-white text-purple-700 mx-1 px-4 py-2 rounded border border-purple-500 font-semibold"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="bg-white text-purple-700 mx-1 px-4 py-2 rounded border border-purple-500 font-semibold"
              to="/signup"
            >
              Signup
            </Link>
          </div>
        ) : (
          <div className="flex gap-5 mt-3 items-center">
            <div
              className="bg-white text-red-700 mx-1 px-4 py-2 rounded border border-purple-500 font-semibold cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </div>

            {/* Cart Button with Badge */}
            <div
              className="btn bg-white text-purple-700 mx-2 px-4 py-2 rounded border border-purple-500 font-semibold cursor-pointer"
              onClick={loadCart}
            >
              <Badge color="secondary" badgeContent={cartCount}>
                <ShoppingCartIcon />
              </Badge>
              <span className="ml-2">Cart</span>
            </div>

            {/* Conditional Modal Rendering */}
            {cartView && (
              <Modal onClose={() => setCartView(false)}>
                <Cart />
              </Modal>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
