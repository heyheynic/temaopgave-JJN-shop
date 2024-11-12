"use client";

import Basket from "@/components/Basket";
import CategoryFilter from "@/components/CategoryFilter";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";

import { useState, useEffect } from "react";

import useSWR from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json()); // Fetcher function for SWR to fetch data from a URL

const Page = () => {
  const { data, error, isLoading } = useSWR("https://dummyjson.com/products?limit=50", fetcher); // Using SWR to fetch product data from an API

  // State to track the filtered list of products, selected category, and search query
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // useEffect hook to update filtered products whenever the data, selected category, or search query changes
  useEffect(() => {
    if (data) {
      // Filter products based on selected category
      let products = selectedCategory === "all" ? data.products : data.products.filter((product) => product.category === selectedCategory);

      // Further filter products based on search query
      if (searchQuery) {
        products = products.filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase())); // Case-insensitive search
      }

      // Set the filtered products state
      setFilteredProducts(products);
    }
  }, [data, selectedCategory, searchQuery]); // This effect runs whenever the data, selectedCategory, or searchQuery changes

  // Handle category change: updates the selected category state
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Handle search: updates the searchQuery state
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Handle errors and loading states
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="max-w-[80dvw] m-auto">
      <h1 className="text-title my-m">Products</h1>
      <div>
        <div className="flex justify-between my-s gap-s flex-wrap">
          <CategoryFilter onCategoryChange={handleCategoryChange} /> {/* Pass the category change handler */}
          <SearchBar onSearch={handleSearch} /> {/* Pass the search handler */}
        </div>

        {/* Display the count of filtered products */}
        <p>
          <span>{filteredProducts.length}</span> items
        </p>

        {/* Render the filtered products as cards */}
        <ul className="grid gap-m mx-auto sm:grid-cols-3 lg:grid-cols-4 mb-m">
          {filteredProducts.map(({ id, title, thumbnail, price, discountPercentage, stock }) => (
            <ProductCard key={id} id={id} title={title} thumbnail={thumbnail} price={price} discountPercentage={discountPercentage} stock={stock} />
          ))}
        </ul>
        <div></div>
      </div>

      {/* Basket component */}
      <Basket />
    </div>
  );
};

export default Page;
