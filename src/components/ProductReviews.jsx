"use client";
import { FaRegStar, FaStar } from "react-icons/fa";

const ProductReviews = ({ reviews }) => {
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);

  const averageRatingFullStars = totalRating / reviews.length;

  const emptyStars = 5 - averageRatingFullStars;

  console.log(averageRatingFullStars);

  return (
    <section>
      <div className="flex flex-row items-center ">
        <h2 className="text-title">Reviews</h2>
        {[...Array(averageRatingFullStars)].map((i) => (
          <FaStar className="text-[--redwood] text-title" key={i} />
        ))}
        {[...Array(emptyStars)].map((i) => (
          <FaRegStar className="text-[--redwood] text-title" key={i} />
        ))}
      </div>

      <article className="flex flex-col  flex-nowrap gap-3 sm:flex-wrap sm:flex-row justify-center">
        {/* skal have noget id til at finde dens reveiw */}

        {reviews.map((review, i) => {
          const fullStars = Math.floor(review.rating);
          const emptyStars = 5 - fullStars;

          return (
            <div key={i} className="flex flex-col gap-1 py-3 px-2">
              <div className=" flex flex-row items-center text-subtitle">
                <h2 className="text-[--redwood] text-sub-subtitle">
                  {review.rating}/5
                </h2>

                {/* laver en array med fullstarts og giver dem en unik key som er deres index */}
                {[...Array(fullStars)].map((i) => (
                  <FaStar className="text-[--redwood]" key={i} />
                ))}

                {[...Array(emptyStars)].map((i) => (
                  <FaRegStar className="text-[--redwood]" key={i} />
                ))}
              </div>
              <h4 className="text-emphasize">{review.reviewerName}</h4>
              <p className={fullStars >= 3 ? `text-[--blue-munsell]` : ``}>
                {review.comment}
              </p>
            </div>
          );
        })}
      </article>
    </section>
  );
};

export default ProductReviews;
