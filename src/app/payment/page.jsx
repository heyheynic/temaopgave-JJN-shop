"use client";

import PrimaryButton from "@/components/PrimaryButton";
import PaymentProductCard from "@/components/PaymentProductCard";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Page = () => {
  const searchParams = useSearchParams();
  const items = searchParams.get("items");

  const parseItems = (items) => {
    return items.split("&").map((item) => {
      const [id, quantity] = item.split("-");
      return { id: parseInt(id), quantity: parseInt(quantity) };
    });
  };

  const parsedItems = items ? parseItems(items) : []; // Set to empty array if no items

  const { data, error, isLoading } = useSWR(
    "https://dummyjson.com/products",
    fetcher
  );

  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (data && parsedItems.length > 0) {
      const filteredProducts = parsedItems
        .map((item) => {
          const product = data.products.find((p) => p.id === item.id);
          return product ? { ...product, quantity: item.quantity } : null;
        })
        .filter((product) => product !== null);

      console.log("All products:", data?.products);
      console.log("Filtered Products:", filteredProducts); // Log filtered products

      setProducts(filteredProducts);
    }
  }, [items, data]);

  useEffect(() => {
    const totalPrice = products.reduce(
      (accumulator, product) => accumulator + product.price * product.quantity,
      0
    );
    setTotalPrice(totalPrice);
  }, [products]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load product data.</div>;

  return (
    <div>
      <h1 className="text-title text-center sm:text-left capitalize py-4 px-1">
        Your basket
      </h1>

      <ul className="grid grid-rows-[auto] gap-2 py-2 px-1 ">
        {products.map((product) => (
          <PaymentProductCard
            key={product.id}
            id={product.id}
            productTitle={`Product ${product.title}`}
            price={product.price}
            quantity={product.quantity}
            thumbnail={product.thumbnail}
          />
        ))}
      </ul>

      <section className="text-sub-subtitle flex flex-col items-center justify-center text-center">
        <h4>
          Your total is:{" "}
          <span className="underline">${totalPrice.toFixed(2)}</span>
        </h4>
        <PrimaryButton theme="black" btnText="Pay" />
      </section>
    </div>
  );
};

export default Page;
