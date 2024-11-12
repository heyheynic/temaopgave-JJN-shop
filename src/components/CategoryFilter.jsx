import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const CategoryFilter = ({ onCategoryChange }) => {
  const { data: categories, error, isLoading } = useSWR("https://dummyjson.com/products/categories", fetcher);

  if (error) return <div>Failed to load categories</div>;
  if (isLoading) return <div>Loading categories...</div>;

  return (
    <div>
      <label htmlFor="category-select" className="sr-only">
        Filter by Category:
      </label>
      <select id="category-select" onChange={(event) => onCategoryChange(event.target.value)}>
        <option value="all">All Categories</option>
        {categories.map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
