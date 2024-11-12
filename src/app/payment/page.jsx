"use client";
import Image from "next/image";
import PrimaryButton from "@/components/PrimaryButton";

import PaymentProductCard from "@/components/PaymentProductCard";

import useSWR from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

const Page = () => {
  const { data, error, isLoading } = useSWR(
    "https://dummyjson.com/products",
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  //virker kun lige nu for fetchen
  const total = data.products.reduce(
    (accumulator, product) => accumulator + product.price,
    0
  );

  return (
    <div>
      <h1 className="text-title text-center sm:text-left capitalize py-4 px-1">
        Your basket
      </h1>

      <ul className="grid grid-rows-[auto] gap-2  py-2 px-1 ">
        {data.products.map((product) => [
          <PaymentProductCard
            id={product.id}
            src={product.thumbnail}
            productTitle={product.title}
            price={product.price}
          ></PaymentProductCard>,
        ])}
      </ul>
      <section className="text-sub-subtitle flex flex-col items-center justify-center text-center">
        <h4>
          Your total is : <span className="underline">{total.toFixed(2)}$</span>
        </h4>
        <PrimaryButton theme="black" btnText="Pay"></PrimaryButton>
      </section>
    </div>
  );
};

export default Page;
