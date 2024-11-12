"use client";

import Basket from "@/components/Basket";
import CategoryFilter from "@/components/CategoryFilter";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";

import { useState, useEffect } from "react";

import useSWR from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

const Page = () => {
  const { data, error, isLoading } = useSWR("https://dummyjson.com/products", fetcher);

  // State to track the current selected category and filtered products
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Update filtered products whenever data or category changes
  useEffect(() => {
    if (data) {
      // Filter products based on category
      let products = selectedCategory === "all" ? data.products : data.products.filter((product) => product.category === selectedCategory);

      // Filter products based on search query
      if (searchQuery) {
        products = products.filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()));
      }

      setFilteredProducts(products);
    }
  }, [data, selectedCategory, searchQuery]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <div>
      <h1>Products</h1>
      <div>
        <div>
          <CategoryFilter onCategoryChange={handleCategoryChange} />
          <SearchBar onSearch={handleSearch} />
        </div>

        <p>
          <span>{filteredProducts.length}</span>items
        </p>

        <ul className="grid gap-6 p-6 rounded-lg max-w-4xl mx-auto sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map(({ id, title, thumbnail, price, discountPercentage, stock }) => (
            <ProductCard key={id} id={id} title={title} thumbnail={thumbnail} price={price} discountPercentage={discountPercentage} stock={stock} />
          ))}
        </ul>
        <div></div>
      </div>
      <Basket />
    </div>
  );
};

export default Page;
