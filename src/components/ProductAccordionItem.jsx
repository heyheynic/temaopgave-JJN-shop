import { IoCloseOutline, IoRemove } from "react-icons/io5";
import { useState } from "react";

const ProductAccordionItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <header>
        <button className="flex items-center justify-between w-[90%] text-left font-semibold py-2 border-b-[1px] border-gray-500" onClick={() => setIsOpen(!isOpen)}>
          <span className="text-black">{title}</span>
          <span className="ml-8 self-start">{isOpen ? <IoCloseOutline className="text-foreground text-2xl" /> : <IoRemove className="text-foreground text-2xl" />}</span>
        </button>
      </header>
      {isOpen && (
        <section className="text-sm mt-2">
          <div className="pb-3">{content}</div>
        </section>
      )}
    </div>
  );
};

export default ProductAccordionItem;
