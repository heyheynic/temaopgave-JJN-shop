import Basket from "@/components/Basket";
import CategoryFilter from "@/components/CategoryFilter";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";

const Page = async () => {
  return (
    <div>
      <h1>Products</h1>
      <div>
        <CategoryFilter />
        <SearchBar />
        <p>
          <span>0</span>items
        </p>
        <div>
          <ProductCard />
        </div>
      </div>
      <Basket />
    </div>
  );
};

export default Page;
