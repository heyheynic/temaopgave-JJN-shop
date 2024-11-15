// useEffect is for setting up click event listener
// useRef is used to reference the cart-popup as a click reference.

import { useState, useEffect, useRef } from "react";
import { TbShoppingBag } from "react-icons/tb";
import BasketProductCard from "./BasketProductCard";
import PrimaryButton from "./PrimaryButton";
import Link from "next/link";

const Basket = ({ cart, updateCartQuantity }) => {
  const [isCartVisible, setIsCartVisible] = useState(false);

  const selectedProducts = cart
    .map((product) => `${product.id}-${product.quantity}`)
    .join(",");

  //  calculates the total item count by iterating over each product in the cart and adding its quantity to the total
  const itemCounter = cart.reduce((total, item) => total + item.quantity, 0);

  // calculating the total price by iterating over each product in the cart
  const totalPrice = cart.reduce(
    (total, product) =>
      total +
      (product.price - (product.price * product.discountPercentage) / 100) *
        product.quantity,
    0
  );

  const cartRef = useRef(null); // reference to the cart pop-up, this will make it so when one clicks outside of cart popup, it will close

  // Toggles between true/false
  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  // checks if the click target is outside of cartRef. If so, it will close the pop-up by setting isCartVisible to false.
  const handleClickOutside = (event) => {
    // cartRef.current points to the cart pop-up element.
    // event.target is the element that is being clicked
    // !cartRef.current.contains(event.target) checks if the clicked element is outside cartRef.current. If true, it sets isCartVisible to false, hiding the pop-up
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      setIsCartVisible(false);
    }
  };

  // sets up the mousedown event listener when isCartVisible is true, and removes it when isCartVisible is false.
  useEffect(() => {
    if (isCartVisible) {
      //if true, it adds "mousedown" event listener to listen for clicks
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // this is used as a "cleanup function", to ensure that the eventlistener is removed. It is a specific react thing, can't say I fully understand it, but here are some docs: https://refine.dev/blog/useeffect-cleanup/#event-listeners
    // https://react.dev/reference/react/useEffect
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartVisible]);

  return (
    <div className="relative">
      <div className="cart__icon__and__badge ">
        <TbShoppingBag
          className="icons text-accent bg-white dark:bg-medium dark:text-[--background] dark:hover:bg-[--foreground] dark:hover:text-[--background] absolute hover:text-secondary cursor-pointer"
          onClick={toggleCartVisibility}
        />
        <span className="badge__counter bg-accent text-white  dark:text-[--foreground]  rounded-full py-3xs px-2xs relative left-4 bottom-4">
          {itemCounter}
        </span>
      </div>

      {isCartVisible && (
        <div
          ref={cartRef} // attach the ref to the pop-up container
          className="cart__popup__container absolute shadow-lg bg-white border border-medium rounded-lg pt-xs pb-5 px-xs mt-m min-w-[80dvw]
         sm:min-w-max  md:min-w-max lg:min-w-max 
          -right-2 z-50 grid gap-2"
        >
          <div className="cart__popup__header flex justify-between items-center">
            <h3 className="text-lg font-semibold justify-center">Your Cart</h3>
            <button
              onClick={toggleCartVisibility}
              className="text-dark hover:text-black"
            >
              &times;
            </button>
          </div>

          <ul className="cart__product__list grid grid-rows-[auto] gap-4 py-2 px-1">
            {cart.map((product) => (
              <BasketProductCard
                key={product.id}
                id={product.id}
                thumbnail={product.thumbnail}
                title={product.title}
                price={product.price}
                stock={product.stock}
                quantity={product.quantity}
                discountPercentage={product.discountPercentage}
                updateCartQuantity={updateCartQuantity}
              />
            ))}
          </ul>

          <div className="cart__action pt-xs flex justify-between items-center">
            <Link href={`./payment?items=${selectedProducts}`}>
              <PrimaryButton btnText={"Proceed to checkout"} theme="red" />
            </Link>
            <div>Total cost: ${totalPrice.toFixed(2)}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Basket;
