import Image from "next/image";

const PaymentProductCard = ({ shipping, id, src, productTitle, price }) => {
  return (
    <li
      key={id}
      className="flex flex-row justify-start border-2 border-[--redwood] rounded-md max-w-[65ch] "
    >
      <Image src={src} width={100} height={100} alt="placeholder image"></Image>
      <div>
        <h3 className="text-empahize">{productTitle}</h3>

        <p className="text-text">${price}</p>
      
      </div>
      <span className="text-text ml-[auto] px-2">antal</span>
    </li>
  );
};

export default PaymentProductCard;
