import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const CategoryFilter = ({ onCategoryChange }) => {
  const { data: categories, error, isLoading } = useSWR("https://dummyjson.com/products/categories", fetcher);

  if (error) return <div>Failed to load categories</div>; // Display error message if the data fetch fails
  if (isLoading) return <div>Loading categories...</div>; // Display loading message while data is being fetched

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
          <option key={category.slug} value={category.slug} className="text-medium">
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
