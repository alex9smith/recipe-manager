import { useLoaderData } from "react-router";

function RecipeDetails() {
  const recipe = useLoaderData().recipe;
  const ingredients = recipe.ingredients.map((ingredient) => (
    <li>{ingredient}</li>
  ));
  return (
    <div>
      <p>{recipe.name}</p>
      <p>Ingredients:</p>
      <ul>{ingredients}</ul>
    </div>
  );
}

export default RecipeDetails;
