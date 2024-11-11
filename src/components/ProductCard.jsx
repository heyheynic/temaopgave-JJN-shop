import ProductCardCTA from "./ProductCardCTA";

import Link from "next/link";
import Image from "next/image";

const ProductCard = ({ id, title }) => {
  return (
    <li key={id}>
      <Link href={`/products/${id}`}>
        <div></div>
        <p>{title}</p>
      </Link>
      <ProductCardCTA />
    </li>
  );
};

export default ProductCard;
