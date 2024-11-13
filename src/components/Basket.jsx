// useEffect is for setting up click event listener
// useRef is used to reference the cart-popup as a click reference.

import { useState, useEffect, useRef } from "react";
import { TbShoppingBag } from "react-icons/tb";
import BasketProductCard from "./BasketProductCard";
import PrimaryButton from "./PrimaryButton";
import Link from "next/link";

const Basket = ({ cart, updateCartQuantity }) => {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const itemCounter = cart.length;
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
          className="icons text-accent bg-white absolute hover:text-secondary cursor-pointer"
          onClick={toggleCartVisibility}
        />
        <span className="badge__counter bg-accent text-white rounded-full py-3xs px-2xs relative left-4 bottom-4">
          {itemCounter}
        </span>
      </div>

      {isCartVisible && (
        <div
          ref={cartRef} // Attach the ref to the pop-up container
          className="cart__popup__container absolute shadow-lg bg-white border border-medium rounded-lg py-2xs px-xs mt-m w-72 -right-2 z-50"
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
          <ul className="cart__product__list grid grid-rows-[auto] gap-2 py-2 px-1">
            {cart.map((item) => (
              <BasketProductCard
                key={item.id}
                id={item.id}
                src={item.thumbnail}
                productTitle={item.title}
                price={item.price}
                stock={item.stock}
                quantity={item.quantity}
                updateCartQuantity={updateCartQuantity} 
              />
            ))}
          </ul>

          <div className="cart__action">
            <Link href={`./payment/`}>
              <PrimaryButton btnText={"Proceed to checkout"} theme="red" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Basket;
