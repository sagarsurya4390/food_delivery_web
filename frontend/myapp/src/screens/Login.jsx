import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirecting

export default function Login() {
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Loading state to disable button during API call

  const navigate = useNavigate(); // Initialize useNavigate for redirecting

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when starting the API call
    try {
      const response = await fetch("http://localhost:5000/api/loginuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: info.email,
          password: info.password,
        }),
      });

      const json = await response.json();
      console.log(json);

      if (!json.success) {
        alert(json.message || "Invalid login credentials"); // More specific error handling
      } else {
        alert("Login successful!");
        localStorage.setItem("userEmail",info.email);
        localStorage.setItem("authToken", json.authToken); // Save token to localStorage
        console.log(localStorage.getItem("authToken")); // Check if token is stored correctly
        
        navigate("/"); // Redirect to homepage or desired page after login
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again.");
    } finally {
      setLoading(false); // Reset loading state after API call finishes
    }
  };

  // Handle input changes
  const onChange = (e) => {
    const { name, value } = e.target;
    setInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  return (
    <div className="bg-neutral-900 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-lg text-white flex justify-center border border-white rounded-lg p-8">
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col mb-6">
            <label className="text-xl">Email Address</label>
            <input
              type="email"
              className="border border-white bg-neutral-700 rounded w-full h-9 mt-3 px-3"
              name="email"
              value={info.email}
              onChange={onChange}
              required
            />
          </div>

          <div className="flex flex-col mb-6">
            <label className="text-xl">Password</label>
            <input
              type="password"
              className="border border-white bg-neutral-700 rounded w-full h-9 mt-3 px-3"
              name="password"
              value={info.password}
              onChange={onChange}
              required
            />
          </div>

          <div className="flex justify-center gap-6">
            <button
              type="submit"
              className={`${
                loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              } text-white font-semibold py-2 px-4 rounded`}
              disabled={loading} // Disable button when loading
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <Link
              to="/signup" // Redirects to the signup page
              className="bg-red-400 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
            >
              Don't have an account? Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
