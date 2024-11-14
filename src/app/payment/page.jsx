"use client";
import { Suspense } from "react";
import PrimaryButton from "@/components/PrimaryButton";
import PaymentProductCard from "@/components/PaymentProductCard";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal } from "react-icons/fa";

const fetcher = (url) => fetch(url).then((res) => res.json());

const PaymentContent = () => {
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
    <div className="grid lg:grid-cols-[1fr,auto] items-start justify-evenly max-w-[80dvw] min-h-[80vh] m-auto w-fit py-6 gap-6 ">
      <div className="col-start-1 col-span-full">
        <h1 className="text-subtitle  py-4 px-1 my-3">
          Your basket
        </h1>
      </div>

      <ul className="flex flex-col gap-5 ">
        {products.map((product) => (
          <PaymentProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            productTitle={`Product ${product.title}`}
            price={product.price}
            quantity={product.quantity}
            thumbnail={product.thumbnail}
            tags={product.tags}
            discountPercentage={product.discountPercentage}
          />
        ))}
      </ul>
      <section className="flex flex-col gap-4 rounded-[5px] max-w-[80dvw]  my-6 md:my-0  shadow-md text-normal sticky top-3 py-m px-5">
        <div className="flex justify-between text-normal">
          <h6 className="font-bold">Delevery:</h6>
          <span className="underline">$0</span>
        </div>

        <div className="flex justify-between ">
          <h6 className="font-bold">Total:</h6>
          <span className="underline">${totalPrice.toFixed(2)}</span>
        </div>

        <hr className="border-black border"></hr>

        <div className="flex justify-between text-emphasize gap-m">
          <h6 className="text-bold">Total price:</h6>
          <span className="underline">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex gap-4 ">
          <FaCcVisa />
          <FaCcMastercard />
          <FaCcAmex />
          <FaCcPaypal />
        </div>
        <PrimaryButton theme="red" btnText="Go to payment" />
      </section>
    </div>
  );
};

const Page = () => (
  <Suspense fallback={<div>Loading payment information...</div>}>
    <PaymentContent />
  </Suspense>
);

export default Page;
