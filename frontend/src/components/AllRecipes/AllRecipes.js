import { useLoaderData } from "react-router";
import FilterableRecipeList from "../FilterableRecipeList/FilterableRecipeList";

function AllRecipes() {
  const data = useLoaderData();
  return <FilterableRecipeList recipes={data.recipes} />;
}

export default AllRecipes;
