import { FaRegStar, FaStar } from "react-icons/fa";

const ProductSingleReview = ({
  reviewRating,
  reviewerName,
  reviewComment,
  id,
}) => {
  //laver reviw ratingen om til et helt number
  const fullStars = Math.floor(reviewRating);
  const emptyStars = 5 - fullStars;

  return (
    <div key={id} className="flex flex-col gap-1 py-3 px-2">
      <div className=" flex flex-row items-end text-subtitle ">
        <h2 className="text-[--redwood] text-sub-subtitle px-2">
          {reviewRating}/5
        </h2>

        {/* laver en array med fullstarts og giver dem en unik key som er deres index */}
        {[...Array(fullStars)].map((star, i) => (
          <FaStar className="text-[--redwood] text-subtitle" key={i} />
        ))}

        {[...Array(emptyStars)].map((star, i) => (
          <FaRegStar className="text-[--redwood] text-sub-subtitle" key={i} />
        ))}
      </div>
      <h4 className="text-emphasize">{reviewerName}</h4>
      <p className={fullStars >= 3 ? `text-[--blue-munsell]` : ``}>
        {reviewComment}
      </p>
    </div>
  );
};

export default ProductSingleReview;
