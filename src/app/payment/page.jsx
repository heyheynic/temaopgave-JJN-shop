"use client";
import Image from "next/image";
import PrimaryButton from "@/components/PrimaryButton";

import useSWR from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

const Page = () => {
  const { data, error, isLoading } = useSWR(
    "https://dummyjson.com/products/1",
    fetcher
  );

  console.log(data);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <div>
      <h1 className="text-4xl text-center sm:text-left capitalize py-4 px-1">
        {" "}
        Your basket
      </h1>

      <section className="grid grid-rows-[auto] gap-2  py-2 px-1 ">
        <div className="flex flex-row border-2 border-black max-w-[65ch]">
          <Image
            src={data.thumbnail}
            width={100}
            height={100}
            alt="placeholder image"
          ></Image>
          <div>
            <h3>{data.title}</h3>
            <span>antal</span>
            <p>{data.price}$</p>
          </div>
        </div>

        <div className="flex flex-row border-2 border-black max-w-[65ch]">
          <Image
            src={data.thumbnail}
            width={100}
            height={100}
            alt="placeholder image"
          ></Image>
          <div>
            <h3>{data.title}</h3>
            <span>antal</span>
            <p>{data.price}$</p>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center text-center">
        <p>
          Your total is : <span>total</span>
        </p>
        <PrimaryButton theme="black" btnText="Pay"></PrimaryButton>
      </section>
    </div>
  );
};

export default Page;
