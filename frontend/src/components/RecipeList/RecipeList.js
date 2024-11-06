import RecipeListItem from "../RecipeListItem/RecipeListItem";

import "./RecipeList.css";

function RecipeList({ recipes }) {
  const items = recipes.map((recipe) => (
    <RecipeListItem recipe={recipe} key={recipe.id} />
  ));

  return <ul className="recipe-list">{items}</ul>;
}

export default RecipeList;
