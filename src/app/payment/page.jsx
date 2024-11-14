"use client";

import PrimaryButton from "@/components/PrimaryButton";
import PaymentProductCard from "@/components/PaymentProductCard";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal } from "react-icons/fa";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Page = () => {
  const searchParams = useSearchParams();
  const items = searchParams.get("items");

  const parseItems = (items) => {
    return items.split(",").map((item) => {
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
    <div className="flex flex-col md:flex-row items-start justify-evenly max-w-[80dvw] min-h-[80vh] m-auto py-6">
      <div className="">
        <h1 className="text-title text-center sm:text-left capitalize py-4 px-1 my-3">
          Your basket
        </h1>

        <ul className="flex flex-col gap-5 ">
          {products.map((product) => (
            <PaymentProductCard
              key={product.id}
              id={product.id}
              productTitle={`Product ${product.title}`}
              price={product.price}
              quantity={product.quantity}
              thumbnail={product.thumbnail}
              tags={product.tags}
              discountPercentage={product.discountPercentage}
            />
          ))}
        </ul>
      </div>

      <section className="flex flex-col gap-3 rounded-[5px] min-w-[100%] md:min-w-[40%] my-6 md:my-0  shadow-md text-sub-subtitle sticky top-3 py-3 px-5">
        <div className="flex justify-between text-emphasize">
          <h6>Delevery: </h6>
          <span className="underline">$0</span>
        </div>

        <div className="flex justify-between text-emphasize">
          <h6>Total:</h6>
          <span className="underline">${totalPrice.toFixed(2)}</span>
        </div>

        <hr className="border-black border-2"></hr>

        <div className="flex justify-between text-emphasize">
          <h6 className="text-bold">Total price:</h6>
          <span className="underline">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex gap-4 ">
          <FaCcVisa />
          <FaCcMastercard />
          <FaCcAmex />
          <FaCcPaypal />
        </div>
        <PrimaryButton theme="black" btnText="Go to payment" />
      </section>
    </div>
  );
};

export default Page;
