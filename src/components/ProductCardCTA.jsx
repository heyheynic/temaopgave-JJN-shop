import { LuBookmark } from "react-icons/lu";
const ProductCardCTA = () => {
  return (
    <div className="btn bg-medium hover:outline outline-white outline-1 [&>*]:hover:fill-white  hover:bg-secondary w-fit p-3xs ">
      <LuBookmark className=" size-xs " />
    </div>
  );
};

export default ProductCardCTA;
