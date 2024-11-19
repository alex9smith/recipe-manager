import { TextInput } from "@primer/react";
import { SearchIcon } from "@primer/octicons-react";

function SearchBar({ searchText, onSearchTextChange }) {
  return (
    <TextInput
      block={true}
      leadingVisual={<SearchIcon />}
      value={searchText}
      onChange={(e) => onSearchTextChange(e.target.value)}
    />
  );
}

export default SearchBar;
