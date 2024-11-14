import Image from "next/image";

const PaymentProductCard = ({
  shipping,
  id,
  thumbnail,
  productTitle,
  price,
  quantity,
  tags,
}) => {
  return (
    <li
      key={id}
      className="flex justify-start gap-1 border-2 border-[--redwood] rounded-md max-w-[65ch] "
    >
      <Image src={thumbnail} width={150} height={100} alt="placeholder image" />
      <div className="[&>*]:py-1">
        <h3 className="text-emphasize">{productTitle}</h3>
        <ul className="flex gap-2">
          {tags.map((tag, i) => (
            <li className="capitalize" key={i}>
              {tag}
            </li>
          ))}
        </ul>

        <p className="text-text font-bold">${price}</p>

        <p>{shipping}</p>
      </div>
      <span className="text-emphasize ml-[auto] px-2">x{quantity}</span>
    </li>
  );
};

export default PaymentProductCard;
