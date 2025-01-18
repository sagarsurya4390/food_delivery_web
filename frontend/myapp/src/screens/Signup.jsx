import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [info, setInfo] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "", // Changed from "address" to "geolocation" for consistency with the state
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      const response = await fetch("http://localhost:5000/api/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: info.name,
          email: info.email,
          password: info.password,
          location: info.geolocation, // Ensure this matches your API's expected field
        }),
      });

      const json = await response.json();
      console.log(json);
      
      if (!json.success) { // Fixed typo: `json.sucess` to `json.success`
        alert("Enter valid details");
      } else {
        alert("Signup successful!"); // Optional: Notify the user of success
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred. Please try again."); // Handle any errors during the fetch
    }
  };

  const onChange = (event) => {
    setInfo({ ...info, [event.target.name]: event.target.value }); // Update state for controlled inputs
  };

  return (
    <>
      <div className="bg-neutral-900 min-h-screen flex justify-center items-center">
        <div className="w-full max-w-lg text-white flex justify-center border border-white rounded-lg p-8">
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col mb-6">
              <label className="text-xl">Name</label>
              <input
                type="text"
                className="border border-white bg-neutral-700 rounded w-full h-9 mt-3 px-3"
                name="name"
                value={info.name}
                onChange={onChange} // Ensuring onChange is set
                required // Optional: Add required validation
              />
            </div>

            <div className="flex flex-col mb-6">
              <label className="text-xl">Email Address</label>
              <input
                type="email" // Changed type to "email" for validation
                className="border border-white bg-neutral-700 rounded w-full h-9 mt-3 px-3"
                name="email"
                value={info.email}
                onChange={onChange}
                required // Optional: Add required validation
              />
              <div>We'll never share your email with anyone else.</div>
            </div>

            <div className="flex flex-col mb-6">
              <label className="text-xl">Password</label>
              <input
                type="password"
                className="border border-white bg-neutral-700 rounded w-full h-9 mt-3 px-3"
                name="password"
                value={info.password}
                onChange={onChange}
                required // Optional: Add required validation
              />
            </div>

            <div className="flex flex-col mb-6">
              <label className="text-xl">Geolocation</label> {/* Changed label to Geolocation */}
              <input
                type="text"
                className="border border-white bg-neutral-700 rounded w-full h-9 mt-3 px-3"
                name="geolocation" // Added name for geolocation input
                value={info.geolocation} // Added value for controlled input
                onChange={onChange} // Added onChange here
                required // Optional: Add required validation
              />
            </div>

            <div className="flex justify-center gap-6">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              >
                Submit
              </button>
              <Link
                to="/login"
                className="bg-red-400 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
              >
                Already a user
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
