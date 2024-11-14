"use client";

import Image from "next/image";

// useState: This is used to store the current index of the image that is selected by the user
// useRef: This hook is used to create a reference (scrollRef) to the scroll container
import { useState, useRef } from "react";
import ProductAccordionItem from "./ProductAccordionItem";
import PrimaryButton from "./PrimaryButton";
import ProductCardCTA from "./ProductCardCTA";

const ProductSingle = ({ product }) => {
  // The product object is passed in as a prop, and we destructure it to get the variables (images is an array)
  const { title, images, description, stock, price, discountPercentage, brand, warrantyInformation, shippingInformation, sku, weight, dimensions } = product;

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
    <div className="grid gap-l items-start grid-cols-1 md:grid-cols-2 lg:grid-cols-[auto_1fr_1fr]">
      <div className="col-start-1 lg:col-start-2 row-start-1 justify-self-end z-10 ">
        <ProductCardCTA />
      </div>
      {/* Horizontal scroll container */}
      <div
        ref={scrollRef} // Reference to the scroll container
        className="relative m-w-[100vw] col-start-1 lg:col-start-2 row-start-1 w-full overflow-x-auto flex snap-mandatory snap-x gap-xl  "
      >
        {images.map((image, index) => (
          <div key={index} className="snap-center flex-[0_0_100%] ">
            <Image
              src={image}
              alt={title}
              width={800}
              height={800}
              className="object-contain w-full max-h-[500px] "
            />
          </div>
        ))}
      </div>

      {/* Product description */}
      <div className="row-span-2">
        {stock === 0 && <p className="text-red-700 mb-2xs">Out of stock</p>}
        <p className="pb-3xs text-medium">{brand}</p>
        <p className="text-subtitle">{title}</p>
        <p className="max-w-[55ch] my-xs">{description}</p>
        {discountPercentage ? (
          <div>
            <p className="text-red-700 font-bold text-emphasize">
              Now ${(price - (price / 100) * discountPercentage).toFixed(2)}
            </p>
            <p className="py-3xs font-thin ">
              <span className="text-medium line-through	">${price} </span>
              <span className="text-red-700">(-{discountPercentage}%)</span>
            </p>
          </div>
        ) : (
          <p className="font-bold emphasize">${price}</p>
        )}
        <div className="my-2xs">
          <PrimaryButton btnText="Add to cart " theme="red" />
        </div>

        <section>
          <ProductAccordionItem
            title="Product information"
            content={
              <div>
                <div>Weight: {weight} gram</div>
                <div>
                  Dimensions: {dimensions.width} / {dimensions.height} /{" "}
                  {dimensions.depth}
                </div>
                <div>SKU: {sku}</div>
              </div>
            }
          />
          <ProductAccordionItem
            title="Warranty"
            content={warrantyInformation}
          />
          <ProductAccordionItem
            title="Shipping"
            content={shippingInformation}
          />
        </section>
      </div>

      {/* Thumbnail navigation */}
      <div className="flex gap-xs row-start-2 lg:flex-col lg:place-self-end lg:col-start-1 lg:row-start-1">
        {images.map((image, index) => (
          <button key={index} onClick={() => handleThumbnailClick(index)}>
            <Image
              src={image}
              alt={title}
              width={80}
              height={80}
              className="object-contain max-h-[80px] "
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductSingle;
