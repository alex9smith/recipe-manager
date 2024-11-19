import { Box } from "@primer/react";
import RecipeListItem from "../RecipeListItem/RecipeListItem";

function RecipeList({ recipes }) {
  const items = recipes.map((recipe, index) => (
    <RecipeListItem recipe={recipe} key={recipe.id} dark={index % 2 === 0} />
  ));

  return <Box sx={{ mt: 2 }}>{items}</Box>;
}

export default RecipeList;
