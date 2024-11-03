import { Link } from "react-router-dom";

function RecipeListItem({ recipe }) {
  const url = `/recipes/${recipe.id}`;
  return (
    <li>
      <Link to={url}>{recipe.name}</Link>
    </li>
  );
}

export default RecipeListItem;
