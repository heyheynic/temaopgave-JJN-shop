import Link from "next/link";
import Image from "next/image";
import PrimaryButton from "./PrimaryButton";
import ProductCardCTA from "./ProductCardCTA";

const ProductCard = ({
  product,
  addToCart, //function from products page.jsx
}) => {

   const { id, title, thumbnail, price, discountPercentage, stock } = product;
  // Calculating discounted price if discountPercentage has a value.
  // price - (price * discountPercentage) / 100 is what calculates the price
  const discountedPrice = discountPercentage
    ? price - (price * discountPercentage) / 100
    : null;

  const handleAddToCart = () => {
    addToCart({ ...product });
  };

  // slugify name string from JSON to an URL-friendly slug. Got this from https://dev.to/bybydev/how-to-slugify-a-string-in-javascript-4o9n
  // I know there exists a specific npm-install but I wanted to try this
  function slugify(str) {
    str = str.replace(/^\s+|\s+$/g, ""); // trim leading/trailing white space
    str = str.toLowerCase(); // convert string to lowercase
    str = str
      .replace(/[^a-z0-9 -]/g, "") // remove any non-alphanumeric characters
      .replace(/\s+/g, "-") // replace spaces with hyphens
      .replace(/-+/g, "-"); // remove consecutive hyphens
    return str;
  }

  const titleToSlug = title;
  // const slug = `${id}+${slugify(titleToSlug)}`
  const slug = slugify(titleToSlug);

  return (
    // Gives the list items a opacity of 50%, and no pointer events (you can't click on it) if stock is === 0.
    <li
      className={`product__card__item grid grid-rows-[1fr,auto,auto] rounded-md ${
        stock === 0 ? "opacity-50 pointer-events-none" : ""
      } ${
        discountPercentage ? "shadow-md px-3xs py-2xs hover:shadow-2xl" : ""
      }`}
    >
      <Link href={`/products/${id}-${slug}`} className="grid gap-xs">
        <div className="image__bookmark__grid grid grid-rows-[1fr] ">
          <div className="row-span-full col-span-full  m-auto">
            <Image src={thumbnail} width={200} height={200} alt={title} />
          </div>
          <div className="row-span-full col-span-full row-start-1 justify-self-end">
            <ProductCardCTA />
          </div>
        </div>

        <h3 className="text-emphasize">{title}</h3>
      </Link>
      <div className="price__field justify-self-end">
        {/* Show discounted price if applicable, which is it on every item..
          
            discountPercentage ? (...) : (...) is a conditional rendering. IF there is a discountPercentage, it will show both the original price and the discounted. If NOT, it will just show the price. */}
        {discountPercentage ? (
          <div>
            <span className="line-through text-medium">${price}</span>
            <span className="text-red-500 ml-2 font-semibold">
              {/* toFixed(2) rounds up the price decimal to .00, so it will be written ex. $5.07 and not just $5 or $5.0782497 */}
              ${discountedPrice.toFixed(2)}
            </span>
          </div>
        ) : (
          <span>${price}</span>
        )}
      </div>
      <div className="add__to__cart__btn place-self-end pt-xs">
        {/* Change button state if sold out */}
        {stock > 0 ? (
          <PrimaryButton
            btnText={"Add to Cart"}
            theme={"red"}
            onClick={handleAddToCart}
            discountedPrice={discountedPrice}
          />
        ) : (
          <PrimaryButton btnText={"Sold Out"} theme={"soldOut"} />
        )}
      </div>
    </li>
  );
};

export default ProductCard;
