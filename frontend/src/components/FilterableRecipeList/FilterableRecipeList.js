import { useLoaderData } from "react-router";

function FilterableRecipeList() {
  const recipeListItems = useLoaderData().map((recipe) => (
    <li>{recipe.name}</li>
  ));

  return <ul>{recipeListItems}</ul>;
}

export default FilterableRecipeList;
