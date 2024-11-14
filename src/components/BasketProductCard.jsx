import Image from "next/image";
import PrimaryButton from "./PrimaryButton";

const BasketProductCard = ({
  id,
  thumbnail,
  title,
  price,
  stock,
  quantity,
  updateCartQuantity,
  discountPercentage,
}) => {
  // increment function
  const increment = () => {
    if (quantity < stock) {
      updateCartQuantity(id, quantity + 1);
    } else {
      alert("No more items available.");
    }
  };

  // decrement function
  const decrement = () => {
    if (quantity > 1) {
      updateCartQuantity(id, quantity - 1);
    } else {
      updateCartQuantity(id, 0); // 0 quantity should remove item
    }
  };

  return (
    <li
      key={id}
      className="flex px-3xs py-2xs gap-2 flex-row  justify-start border-2 border-[--redwood] rounded-md max-w-[65ch]"
    >
      <Image
        src={thumbnail}
        width={100}
        height={100}
        alt={title}
        className="border dark:bg-slate-100"
      />
      <div className="flex flex-col justify-between">
        <h3 className="text-empahize font-medium">{title}</h3>

        <div className="flex gap-2">
          <span className="line-through text-medium">${price}</span>
          <p className="text-text font-semibold text-red-600">
            $
            {(price - (price / 100) * discountPercentage).toFixed(2)} 
          </p>
        </div>
        <div className="quantity__counter__container flex items-center space-x-4 ">
          <PrimaryButton
            onClick={decrement}
            className="px-4 py-2 rounded transition duration-200 btn"
            theme={"default"}
            btnText={"-"}
          />

          <span className="text-normal font-semibold">{quantity}</span>

          <PrimaryButton
            onClick={increment}
            className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded hover:bg-gray-400 transition duration-200"
            theme={"default"}
            btnText={"+"}
          />
        </div>
      </div>
    </li>
  );
};

export default BasketProductCard;
