import Link from "next/link";
import { FiHome } from "react-icons/fi";
import { RiShoppingBag3Line } from "react-icons/ri";

const Header = () => {
  return (
    <header className="py-4 px-2 border-b-2 border-[--foreground]">
      <nav>
        <ul className="justify-start   flex flex-row items-center gap-2 ">
          <li>
            <Link
              className="flex flex-row items-center gap-1 bg-[--foreground] text-[--background] py-2 px-4 rounded-[5px] outline outline-[--foreground] outline-1 hover:outline-offset-2 focus:outline-offset-2 capitalize"
              href={`/`}
            >
              <FiHome className="text-text text-[--background]" />
              <span>Home</span>
            </Link>
          </li>

          <li>
            <Link
              className="flex flex-row items-center gap-1 bg-[--foreground] text-[--background] py-2 px-4 rounded-[5px] outline outline-[--foreground] outline-1 hover:outline-offset-2 focus:outline-offset-2 capitalize"
              href={`/products`}
            >
              <RiShoppingBag3Line className="text-text text-[--background]" />
              <span>Products</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
