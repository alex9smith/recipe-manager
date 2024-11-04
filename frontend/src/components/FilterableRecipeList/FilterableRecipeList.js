import { useLoaderData } from "react-router";
import RecipeList from "../RecipeList/RecipeList";
import Filters from "../Filters/Filters";
import SearchBar from "../SearchBar/SearchBar";

function FilterableRecipeList() {
  const recipes = useLoaderData()["recipes"];

  return (
    <div>
      <SearchBar />
      <Filters />
      <RecipeList recipes={recipes} />
    </div>
  );
}

export default FilterableRecipeList;
