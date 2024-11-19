import { TextInput } from "@primer/react";
import { SearchIcon } from "@primer/octicons-react";

function SearchBar({ searchText, onSearchTextChange, sx }) {
  return (
    <TextInput
      block={true}
      leadingVisual={<SearchIcon />}
      value={searchText}
      onChange={(e) => onSearchTextChange(e.target.value)}
      sx={sx}
    />
  );
}

export default SearchBar;
