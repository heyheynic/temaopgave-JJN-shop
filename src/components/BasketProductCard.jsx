
import Image from "next/image";

const BasketProductCard = ({
  id,
  thumbnail,
  title,
  price,
  stock,
  quantity,
  updateCartQuantity,
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
    if (quantity > 1 ) {
      updateCartQuantity(id, quantity - 1);
    } else {
      updateCartQuantity(id, 0) // 0 quantity should remove item
    }
  };

  return (
    <li
      key={id}
      className="flex flex-row justify-start border-2 border-[--redwood] rounded-md max-w-[65ch]"
    >
      <Image src={thumbnail} width={100} height={100} alt="placeholder image"></Image>
      <div>
        <h3 className="text-empahize">{title}</h3>
        <p className="text-text">${price}</p>
        <div className="quantity__counter__container flex items-center space-x-4">
          <button
            onClick={decrement}
            className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded hover:bg-gray-400 transition duration-200"
          >
            −
          </button>

          <span className="text-normal font-semibold">{quantity}</span>

          <button
            onClick={increment}
            className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded hover:bg-gray-400 transition duration-200"
          >
            +
          </button>
        </div>
      </div>
    </li>
  );
};

export default BasketProductCard;
