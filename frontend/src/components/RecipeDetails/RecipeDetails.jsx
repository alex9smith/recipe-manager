import { useLoaderData } from "react-router";
import { useState } from "react";
import { LabelGroup, Heading, Box, Button } from "@primer/react";
import FullWidthPage from "../FullWidthPage/FullWidthPage";
import BorderBox from "../BorderBox/BorderBox";
import CategoryLabel from "../CategoryLabel/CategoryLabel";
import DifficultyLabel from "../DifficultyLabel/DifficultyLabel";
import LengthLabel from "../LengthLabel/LengthLabel";
import Source from "../Source/Source";
import Ingredients from "../Ingredients/Ingredients";
import AddOrEditRecipe from "../AddNewOrEditRecipe/AddNewOrEditRecipe";

function RecipeDetails() {
  const recipe = useLoaderData().recipe;
  const [isEditing, setIsEditing] = useState(false);

  const displayRecipe = (
    <Box>
      <Heading as={"h1"} sx={{ mb: 2 }}>
        {recipe.name}
      </Heading>
      <LabelGroup>
        <CategoryLabel category={recipe.category} />
        <DifficultyLabel difficulty={recipe.difficulty} />
        <LengthLabel length={recipe.length} />
      </LabelGroup>
      <BorderBox>
        <Source source={recipe.source} />
        <Ingredients recipe={recipe} />
      </BorderBox>
      <Button variant="primary" onClick={() => setIsEditing(true)}>
        Edit recipe
      </Button>
    </Box>
  );

  return (
    <FullWidthPage>
      {isEditing ? (
        <AddOrEditRecipe recipe={recipe} onSubmit={() => setIsEditing(false)} />
      ) : (
        displayRecipe
      )}
    </FullWidthPage>
  );
}

export default RecipeDetails;
