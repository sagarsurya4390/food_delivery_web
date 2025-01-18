import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import FoodCarousel from "../components/FoodCarousal";

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState(""); // Add search state
  const [loading, setLoading] = useState(true); // Loading state

  const loadData = async () => {
    setLoading(true); // Start loading before fetching data
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    });
    response = await response.json();
    console.log('API Response:', response); // Log response to check the structure

    // Assuming response is an array with items at index 0 and categories at index 1
    setFoodItem(response[0]);
    setFoodCat(response[1]);
    setLoading(false); // Set loading to false once data is loaded
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display loading indicator while fetching data
  }

  return (
    <>
      <div className="min-h-screen">
        <Navbar />

        <div className="my-4">
          <FoodCarousel />
        </div>

        {/* Updated Search Component */}
        <div className="my-4 text-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for food..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-1/2 p-2 rounded-lg border-none focus:outline-none bg-gray-800 text-white"
              style={{ backdropFilter: "blur(10px)", backgroundColor: "rgba(0, 0, 0, 0.5)" }} // Optional: Make it semi-transparent
            />
          </div>
        </div>

        <div className="my-4 text-white">
          {foodCat.length > 0 ? (
            foodCat.map((category) => (
              <div key={category._id} className="mb-6">
                <h2 className="text-2xl font-semibold mb-4 text-center">
                  {category.CategoryName}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {foodItem.length > 0 && foodItem
                    .filter(
                      (item) =>
                        item.CategoryName.trim().toLowerCase() === category.CategoryName.trim().toLowerCase() &&
                        item.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((filteredItem) => (
                      <div key={filteredItem._id} className="p-4 bg-gray-800 rounded-lg">
                        <Card
                          foodItem={filteredItem}
                          options={filteredItem.options[0]}
                          imgSrc={filteredItem.img}
                        />
                      </div>
                    ))}
                </div>
              </div>
            ))
          ) : (
            <p>No categories available</p>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
}
