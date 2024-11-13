import "./SearchBar.css";

function SearchBar({ searchText, onSearchTextChange }) {
  return (
    <form className="filter search">
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => onSearchTextChange(e.target.value)}
        className="search"
      ></input>
    </form>
  );
}

export default SearchBar;
