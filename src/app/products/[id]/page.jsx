import ProductReviews from "@/components/ProductReviews";
import ProductSingle from "@/components/ProductSingle";

import Link from "next/link";

import { IoIosArrowBack } from "react-icons/io";

const Page = async ({ params }) => {
  const id = (await params).id;

  let response = await fetch(`https://dummyjson.com/products/${id}`);
  let data = await response.json();

  return (
    <div className="max-w-[80dvw] m-auto my-m">
      <Link href={`../products/`} className="flex items-center gap-2 mb-m">
        <IoIosArrowBack />
        Tilbage
      </Link>
      <ProductSingle product={data} />
      <div className="border-b-2 my-l"></div>
      <ProductReviews reviews={data.reviews} />
    </div>
  );
};

export default Page;
