import Link from "next/link";

const Header = () => {
  return (
    <header className="py-4 px-2 border-b-2 border-black">
      <nav>
        <ul className="flex flex-row items-center justify-start gap-2 ">
          <li>
            <Link
              className="bg-black text-white py-2 px-4 rounded-full outline outline-black outline-1 hover:outline-offset-2 focus:outline-offset-2 capitalize"
              href={`/`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="bg-black text-white py-2 px-4 rounded-full outline outline-black outline-1  hover:outline-offset-2 focus:outline-offset-2 capitalize"
              href={`/payment`}
            >
              Basket
            </Link>
          </li>
          <li>
            <Link
              className="bg-black text-white py-2 px-4 rounded-full outline outline-black outline-1  hover:outline-offset-2 focus:outline-offset-2 capitalize"
              href={`/products`}
            >
              Product List
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
