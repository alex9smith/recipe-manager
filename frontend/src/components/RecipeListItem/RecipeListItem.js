import { Link } from "react-router-dom";
import { Box } from "@primer/react";

function onDragStart(e) {
  e.dataTransfer.setData("text/id", e.target.id);
}

function RecipeListItem({ recipe, dark }) {
  return (
    <Box
      sx={{
        borderRadius: 2,
        p: 1,
        backgroundColor: dark ? "canvas.inset" : "canvas.default",
      }}
    >
      <Link
        to={`/recipes/${recipe.id}`}
        draggable="true"
        onDragStart={onDragStart}
        id={recipe.id}
      >
        {recipe.name}
      </Link>
    </Box>
  );
}

export default RecipeListItem;
