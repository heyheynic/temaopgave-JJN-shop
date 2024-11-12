import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query); // Pass the search query to the parent component
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Search for products..." value={query} onChange={handleInputChange} />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
