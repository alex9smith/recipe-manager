import { useLoaderData } from "react-router";
import RecipeListItem from "../RecipeListItem/RecipeListItem";

function FilterableRecipeList() {
  const recipeListItems = useLoaderData()["recipes"].map((recipe) => (
    <RecipeListItem recipe={recipe} key={recipe.id} />
  ));

  return <ul>{recipeListItems}</ul>;
}

export default FilterableRecipeList;
