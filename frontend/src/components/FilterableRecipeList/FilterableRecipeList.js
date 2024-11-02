const recipes = [
  {
    name: "a recipe",
  },
];

function FilterableRecipeList() {
  const recipeListItems = recipes.map((recipe) => <li>{recipe.name}</li>);

  return <ul>{recipeListItems}</ul>;
}

export default FilterableRecipeList;
