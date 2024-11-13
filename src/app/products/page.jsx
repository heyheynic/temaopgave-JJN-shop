"use client";

import { useState, useEffect } from "react";

import useSWR from "swr";

import Basket from "@/components/Basket";
import CategoryFilter from "@/components/CategoryFilter";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";

const fetcher = (url) => fetch(url).then((res) => res.json()); // Fetcher function for SWR to fetch data from a URL

const Page = () => {
  const { data, error, isLoading } = useSWR("https://dummyjson.com/products?limit=50", fetcher); // Using SWR to fetch product data from an API

  // State to track the filtered list of products, selected category, and search query
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]); // State to track items in the basket

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

      // Filter categories to include only those that have at least one item
      // `reduce` is a method that lets us build up or "accumulate" a result as we go through each item.
      // In this case, our result will be an array of unique categories that have products.
      const categoriesWithItems = data.products.reduce((acc, product) => {
        // `acc` is short for "accumulator." It starts as an empty array and we'll add categories to it as we go through each product.

        if (!acc.includes(product.category)) acc.push(product.category); // If the category is NOT already in `acc`, we add it to `acc` using `push`.

        return acc; // Finally, we return `acc` so it carries over to the next loop with the new value.
      }, []); // The `, []` at the end means we start with an empty array `[]` as our initial `acc`.

      // When reduce is done looping through all products, `categoriesWithItems` will be an array of unique categories that have at least one product.
      setFilteredCategories(categoriesWithItems);
    }
  }, [data, selectedCategory, searchQuery]); // This effect runs whenever the data, selectedCategory, or searchQuery changes

  // Handle category change: updates the selected category state
  const handleCategoryChange = (category) => setSelectedCategory(category);

  // Handle search: updates the searchQuery state
  const handleSearch = (query) => setSearchQuery(query);

  // Handles adding a product to the cart
  // parameter is the product object
  const addToCart = (product) => {
    // prevChart checks the previous cart state to see if products have already been added
    setCart((prevCart) => {
      // if item not already in cart, add it with a quantity of 1
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Function to update item quantity in the cart, removes if quantity = 0
  const updateCartQuantity = (id, newQuantity) => {
    setCart((prevCart) => {
      // if a product quantity is 0, it will be removed from the basket/cart. (removing any product with a matching id)
      if (newQuantity === 0) {
        return prevCart.filter((product) => product.id !== id);
      }

      // if newQuantity is greater than 0, it will update the products quantity by mapping throuch the cart
      return prevCart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item));
    });
  };

  // Handle errors and loading states
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="max-w-[80dvw] m-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-title my-m">Products</h1>

        {/* Basket component */}
        <Basket cart={cart} updateCartQuantity={updateCartQuantity} />
      </div>
      <div>
        <div className="flex justify-between my-s gap-s flex-wrap">
          <CategoryFilter
            onCategoryChange={handleCategoryChange} //Pass the category change handler
            categories={filteredCategories} // Pass filtered categories
          />
          <SearchBar onSearch={handleSearch} /> {/* Pass the search handler */}
        </div>

        {/* Display the count of filtered products */}
        <p>
          <span>{filteredProducts.length}</span> items
        </p>

        {/* Render the filtered products as cards */}
        <ul className="grid gap-m mx-auto sm:grid-cols-3 lg:grid-cols-4 mb-m">
          {filteredProducts.map(({ id, title, thumbnail, price, discountPercentage, stock }) => (
            <ProductCard
              key={id}
              id={id}
              title={title}
              thumbnail={thumbnail}
              price={price}
              discountPercentage={discountPercentage}
              stock={stock}
              addToCart={addToCart} // Pass addToCart to ProductCard
            />
          ))}
          {/* This also works, and here we don't have to explicitly pass the props */}
          {/* {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product} // spread operator, takes all properties of product object, they get passed as props to ProductCard. However, that might be a bit redundant considering all of the props that exist in each object
              addToCart={addToCart} // Pass addToCart to ProductCard
            />
          ))} */}
        </ul>
      </div>
    </div>
  );
};

export default Page;
