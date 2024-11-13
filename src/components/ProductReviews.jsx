"use client";
import { FaRegStar, FaStar } from "react-icons/fa";
import ProductSingleReview from "./ProductSingleReview";

const ProductReviews = ({ reviews }) => {
  //finder den totale rating for reviews
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);

  //finder den avarage rating for reviews om til et helt nummer
  const averageRatingFullStars = Math.floor(totalRating / reviews.length);

  const emptyStars = 5 - averageRatingFullStars;

  console.log(averageRatingFullStars);

  return (
    <section>
      <div className="flex flex-row items-end py-5 ">
        <h2 className="text-title px-2">Reviews</h2>

        {/* laver fullstarts ud fra "averageRatingFullStars" */}
        {[...Array(averageRatingFullStars)].map((star, i) => (
          <FaStar className="text-[--redwood] text-subtitle" key={i} />
        ))}

        {[...Array(emptyStars)].map((star, i) => (
          <FaRegStar className="text-[--redwood] text-sub-subtitle" key={i} />
        ))}
      </div>

      <article className="flex flex-col flex-nowrap gap-3 sm:flex-wrap sm:flex-row justify-center">
        {reviews.map((review, i) => (
          <ProductSingleReview
            id={review.id || i}
            key={review.id || i}
            reviewComment={review.comment}
            reviewRating={review.rating}
            //
            reviewerName={review.reviewerName.split(" ")[0]}
     />
        ))}
      </article>
    </section>
  );
};

export default ProductReviews;
