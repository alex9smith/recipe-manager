import { Link } from "react-router-dom";

function onDragStart(e) {
  e.dataTransfer.setData("text/id", e.target.id);
  e.dataTransfer.setData("text/name", e.target.textContent);
}

function RecipeListItem({ recipe }) {
  const url = `/recipes/${recipe.id}`;
  return (
    <li>
      <Link to={url} draggable="true" onDragStart={onDragStart} id={recipe.id}>
        {recipe.name}
      </Link>
    </li>
  );
}

export default RecipeListItem;
