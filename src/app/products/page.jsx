"use client";

import Basket from "@/components/Basket";
import CategoryFilter from "@/components/CategoryFilter";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";

import useSWR from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

const Page = () => {
  const { data, error, isLoading } = useSWR("https://dummyjson.com/products", fetcher);

  console.log(data);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <div>
      <h1>Products</h1>
      <div>
        <CategoryFilter />
        <SearchBar />
        <p>
          <span>0</span>items
        </p>

        <ul className="grid gap-6 p-6 rounded-lg max-w-4xl mx-auto sm:grid-cols-2 lg:grid-cols-3">
          {data.products.map(({ id, title }) => (
            <ProductCard key={id} id={id} title={title} />
          ))}
        </ul>
        <div></div>
      </div>
      <Basket />
    </div>
  );
};

export default Page;
