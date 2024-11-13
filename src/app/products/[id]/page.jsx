import ProductReviews from "@/components/ProductReviews";
import ProductSingle from "@/components/ProductSingle";

import Link from "next/link";

import { IoIosArrowBack } from "react-icons/io";

const Page = async ({ params }) => {
  // const id = (await params).id;
  // const id = params.id;

  // Trying to give the URL a slug that is more readable while still including id

  const idAndSlug = params.id;

  // extracts only the id part (everything before the first hyphen)
  const id = idAndSlug.split("-")[0];

  let response = await fetch(`https://dummyjson.com/products/${id}`);
  let data = await response.json();

  console.log(data);

  return (
    <div className="max-w-[80dvw] m-auto my-m">
      <Link href={`../products/`} className="flex items-center gap-2 mb-m">
        <IoIosArrowBack />
        Go back
      </Link>
      <ProductSingle product={data} />
      <div className="border-b-2 my-l"></div>
      <ProductReviews reviews={data.reviews} />
    </div>
  );
};

export default Page;
