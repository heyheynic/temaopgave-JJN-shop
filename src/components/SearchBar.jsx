import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  // State to hold the value of the search query
  const [query, setQuery] = useState("");

  // Handle changes in the search input field
  const handleInputChange = (e) => {
    setQuery(e.target.value); // Update the query state with the input field value
  };

  // Handle form submission (triggered when the search button is clicked)
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the page from reloading
    onSearch(query); // Call the parent component's onSearch function, passing the query
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for products..."
        value={query} // Bind input value to the query state
        onChange={handleInputChange} // Call handleInputChange when input changes
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
