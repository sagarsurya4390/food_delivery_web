import React, { useState, useEffect } from "react";

const FoodCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/18803174/pexels-photo-18803174/free-photo-of-momos-dumplings-with-sauces.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1660915/pexels-photo-1660915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/5410401/pexels-photo-5410401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

  // Change image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative w-full h-screen">
     
      <div className="carousel-images flex overflow-hidden rounded-lg h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`flex-shrink-0 w-full h-full transition-transform duration-500 ease-in-out ${
              index === currentIndex ? "block" : "hidden"
            }`}
          >
            <img
              src={image}
              alt={`Food ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Left and Right Arrows */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
        onClick={prevImage}
      >
        &#10094;
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
        onClick={nextImage}
      >
        &#10095;
      </button>
    </div>
  );
};

export default FoodCarousel;
