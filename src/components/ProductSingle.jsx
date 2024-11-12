"use client";

import Image from "next/image";

// useState: This is used to store the current index of the image that is selected by the user
// useRef: This hook is used to create a reference (scrollRef) to the scroll container
import { useState, useRef } from "react";

const ProductSingle = ({ product }) => {
  // The product object is passed in as a prop, and we destructure it to get the variables (images is an array)
  const { title, images, description, stock, price, discountPercentage } = product;

  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track current image index
  const scrollRef = useRef(null); // Reference to the scroll container

  // Handle thumbnail click and scroll to the selected image
  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index); // Set the current image index
    if (scrollRef.current) {
      const imageWidth = scrollRef.current.children[0].clientWidth; // Get the width of one image
      const scrollPosition = index * imageWidth; // Calculate the scroll position
      scrollRef.current.scrollTo({
        left: scrollPosition, // Scroll to the selected image position
        behavior: "smooth", // Enable smooth scrolling
      });
    }
  };

  // const discountedPrice = discountPercentage ? price - (price * discountPercentage) / 100 : null;

  return (
    <div className="grid grid-cols-2 gap-l">
      {/* Horizontal scroll container */}
      <div
        ref={scrollRef} // Reference to the scroll container
        className="relative m-w-[100vw] w-full overflow-x-auto flex snap-mandatory snap-x gap-xl border-foreground border-2 rounded-lg">
        {images.map((image, index) => (
          <div key={index} className="snap-center flex-[0_0_100%]">
            <Image src={image} alt={title} width={800} height={800} className="object-contain w-full max-h-[500px]" />
          </div>
        ))}
      </div>

      {/* Product description */}
      <div>
        {stock === 0 && <p className="text-red-500 mb-2xs">Out of stock</p>}
        <p className="text-subtitle">{title}</p>
        <p className="max-w-[55ch] my-xs">{description}</p>
        {discountPercentage && <p className="text-red-700">Now $ {price - (price / 100) * discountPercentage}</p>}
        <p className={`{discountPercentage} ? text-gray-300 : "" `}>$ {price}</p>
      </div>

      {/* Thumbnail navigation */}
      <div className="flex gap-xs">
        {images.map((image, index) => (
          <button key={index} onClick={() => handleThumbnailClick(index)}>
            <Image src={image} alt={title} width={100} height={100} className="object-contain max-h-[100px]" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductSingle;
