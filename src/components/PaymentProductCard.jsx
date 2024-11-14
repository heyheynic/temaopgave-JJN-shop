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

  return (
    <li
      key={id}
      className="flex justify-start gap-2 border-2 border-accent rounded-md max-w-[65ch] py-2xs px-xs"
    >
      <Image
        src={thumbnail}
        width={150}
        height={100}
        alt={title}
        className="object-contain"
      />
      <div className="[&>*]:py-1">
        <h3 className="text-emphasize">{productTitle}</h3>
        <ul className="flex gap-2">
          {tags.map((tag, i) => (
            <li className="capitalize" key={i}>
              {tag}
            </li>
          ))}
        </ul>

        <p
          className={
            discountPercentage
              ? "line-through text-[--dun] "
              : "text-text font-bold"
          }
        >
          ${price}
        </p>
        {discountPercentage ? (
          <p className="text-red-500 text-text font-bold">
            ${newPrice.toFixed(2)}
          </p>
        ) : (
          ""
        )}
      </div>
      <span className="text-normal self-center ml-[auto] px-2 italic text-secondary">x{quantity}</span>
    </li>
  );
};

export default PaymentProductCard;
