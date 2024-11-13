const ProductAccordionItem = ({ title, content }) => {
  return (
    <div>
      <header>
        <button>
          <span className="text-black">{title}</span>
        </button>
      </header>
      <section>
        <p className="pb-3">{content}</p>
      </section>
    </div>
  );
};

export default ProductAccordionItem;
