import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const CategoryFilter = ({ categories, onCategoryChange }) => {
  return (
    <div className="">
      <label htmlFor="category-select" className="sr-only">
        Filter by Category:
      </label>
      <select
        id="category-select"
        onChange={(event) => onCategoryChange(event.target.value)} // Trigger onCategoryChange when a new category is selected
        className="px-4 py-2 rounded-md text-foreground bg-background border-2 border-accent focus:outline-none ">
        <option value="all" className="text-medium">
          All Categories
        </option>
        {categories.map((category) => (
          <option key={category} value={category} className="text-medium">
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
