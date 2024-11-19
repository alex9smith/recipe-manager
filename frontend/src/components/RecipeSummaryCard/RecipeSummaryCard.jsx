import { Heading } from "@primer/react";
import { Link } from "react-router-dom";
import BorderBox from "../BorderBox/BorderBox";
import Source from "../Source/Source";

function RecipeSummaryCard({ recipe }) {
  return (
    <BorderBox>
      <Heading as="h3" variant="small">
        Today's recipe:
      </Heading>
      <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
      <br />
      <Source source={recipe.source} />
    </BorderBox>
  );
}

export default RecipeSummaryCard;
