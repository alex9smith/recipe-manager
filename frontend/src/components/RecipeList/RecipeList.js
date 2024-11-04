import RecipeListItem from "../RecipeListItem/RecipeListItem";

function RecipeList({ recipes }) {
  const items = recipes.map((recipe) => (
    <RecipeListItem recipe={recipe} key={recipe.id} />
  ));

  return <ul>{items}</ul>;
}

export default RecipeList;
