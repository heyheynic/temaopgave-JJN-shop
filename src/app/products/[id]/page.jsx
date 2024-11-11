import ProductReview from "@/components/ProductReviews";
import ProductSingle from "@/components/ProductSingle";

const Page = async ({ params }) => {
  const id = (await params).id;

  let response = await fetch(`https://dummyjson.com/products/${id}`);
  let data = await response.json();

  const { title } = data;

  return (
    <div>
      <a href="">tilbage</a>
      <ProductSingle title={title} />
      <div></div>
      <ProductReview />
    </div>
  );
};

export default Page;
