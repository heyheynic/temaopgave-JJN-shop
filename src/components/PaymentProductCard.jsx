import Image from "next/image";

const PaymentProductCard = ({
  id,
  thumbnail,
  productTitle,
  price,
  quantity,
  tags,
  discountPercentage,
  title,
}) => {
  const discountPrice = (discountPercentage * price) / 100;
  let newPrice = price - discountPrice;

  const totalPrice = newPrice * quantity;

  return (
    <li
      key={id}
      className="flex flex-col sm:flex-row gap-2 border-2 border-accent rounded-md max-w-[65ch] py-2xs px-xs"
    >
      <Image
        src={thumbnail}
        width={150}
        height={100}
        alt={title}
        className="object-contain max-w-[100%] m-auto sm:m-0"
      />
      <div className="[&>*]:py-1 flex-grow">
        <h3 className="text-emphasize">{productTitle}</h3>
        <ul className="flex gap-2">
          {tags.map((tag, i) => (
            <li className="capitalize" key={i}>
              {tag}
            </li>
          ))}
        </ul>

        <div className="flex gap-2">
          <p
            className={
              discountPercentage
                ? "line-through text-[--dun]"
                : "text-text font-bold"
            }
          >
            ${price}
          </p>
          {discountPercentage ? (
            <p className="text-red-500 text-text font-bold">
              ${newPrice.toFixed(2)}
            </p>
          ) : null}
        </div>

        <div className="total__price__and__quantity mt-2 flex justify-between items-center border-t pt-2">
          <p>Total: ${totalPrice.toFixed(2)}</p>
          <span className="text-normal italic text-secondary">
            x{quantity}
          </span>
        </div>
      </div>
    </li>
  );
};

export default PaymentProductCard;
