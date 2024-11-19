import { useLoaderData } from "react-router";
import { LabelGroup, Heading, PageLayout } from "@primer/react";
import TopNav from "../TopNav/TopNav";
import BorderBox from "../BorderBox/BorderBox";
import CategoryLabel from "../CategoryLabel/CategoryLabel";
import DifficultyLabel from "../DifficultyLabel/DifficultyLabel";
import LengthLabel from "../LengthLabel/LengthLabel";
import Source from "../Source/Source";
import Ingredients from "../Ingredients/Ingredients";

function RecipeDetails() {
  const recipe = useLoaderData().recipe;
  return (
    <PageLayout padding={"none"} containerWidth="fullg">
      <TopNav />
      <PageLayout.Content width={"full"} padding={"normal"}>
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
      </PageLayout.Content>
    </PageLayout>
  );
}

export default RecipeDetails;
