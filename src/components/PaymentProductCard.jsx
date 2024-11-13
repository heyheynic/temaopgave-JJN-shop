import Image from "next/image";

const PaymentProductCard = ({ shipping, id, thumbnail, productTitle, price, quantity }) => {
  return (
    <li
      key={id}
      className="flex flex-row justify-start border-2 border-[--redwood] rounded-md max-w-[65ch] "
    >
      <Image src={thumbnail} width={100} height={100} alt="placeholder image"/>
      <div>
        <h3 className="text-sub-subtitle">{productTitle}</h3>
        <p className="text-text">${price}</p>
        <p>{shipping}</p>
      </div>
      <span className="text-text ml-[auto] px-2">Total amount: {quantity}</span>
    </li>
  );
};

export default PaymentProductCard;
