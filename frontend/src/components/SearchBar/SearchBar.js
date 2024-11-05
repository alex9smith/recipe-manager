function SearchBar({ searchText, onSearchTextChange }) {
  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => onSearchTextChange(e.target.value)}
      ></input>
    </form>
  );
}

export default SearchBar;
