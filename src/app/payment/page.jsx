"use client";
import { Suspense } from "react"; // used for fallback UI while looading data
import PrimaryButton from "@/components/PrimaryButton";
import PaymentProductCard from "@/components/PaymentProductCard";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal } from "react-icons/fa";

// fetcher function for SWR to recieve data from the URL
const fetcher = (url) => fetch(url).then((res) => res.json());

const PaymentContent = () => {
  const searchParams = useSearchParams(); // retrieves search parameters from the URL (items)
  const items = searchParams.get("items"); // the search parameters are set to be "items"

  // parsing/splitting the url string into smaller pieces (splitting each object at every ",")
  const parseItems = (items) => {
    return items.split(",").map((item) => {
      // maps through each item and splits them again between every "-", and assigns first "item" is "id", and the second item is the "quantity". 
      const [id, quantity] = item.split("-");
      return { id: parseInt(id), quantity: parseInt(quantity) }; //returns an object with "id" and "quantity"
    });
  };

  // if "items" exists in the URL, they will be parsed, otherwise, use an empty array
  const parsedItems = items ? parseItems(items) : []; 

  // fetching product data using SWR
  const { data, error, isLoading } = useSWR(
    "https://dummyjson.com/products?limit=100",
    fetcher
  );

  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountedAmount, setDiscountedAmount] = useState(0)

  // effect to filter the products based on the parsedItems
  useEffect(() => {
    // both data and parsedItems have to be available before filtering product
    if (data && parsedItems.length > 0) {
      const filteredProducts = parsedItems
        .map((item) => {
          const product = data.products.find((p) => p.id === item.id); // find the products by the ID that had been parsed
          return product ? { ...product, quantity: item.quantity } : null; // if product returned, add the quantity from parsedItems and return that
        })
        .filter((product) => product !== null); // filter out the null product that were not found

      setProducts(filteredProducts); // update the state of filtered products [products, setProducts]
    }
  }, [items, data]); // rerun useEffect when items or data changes.

  // calculating total price (discounted)
  useEffect(() => {
    const totalPrice = products.reduce(
      (total, product) =>
        total +
        (product.price - (product.price * product.discountPercentage) / 100) *
          product.quantity,
      0
    );
    setTotalPrice(totalPrice);
  }, [products]);

  // calculating discounted amount
  useEffect(() => {
    const discountedAmount = products.reduce(
      (total, product) =>
        total + (product.price * product.discountPercentage) / 100 * product.quantity,
      0
    );
    setDiscountedAmount(discountedAmount)
  }, [products])

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load product data.</div>;

  return (
    <div className="grid lg:grid-cols-[1fr,auto] items-start justify-evenly max-w-[80dvw] min-h-[80vh] m-auto w-fit py-6 gap-6 ">
      <div className="col-start-1 col-span-full">
        <h1 className="text-subtitle  py-4 px-1 my-3">Your basket</h1>
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
          <h6 className="font-bold">Discount:</h6>
          <span className="underline text-red-600">
            ${discountedAmount.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-normal">
          <h6 className="font-bold">Delivery:</h6>
          <span className="underline">$0</span>
        </div>

        <div className="flex justify-between text-em ">
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
