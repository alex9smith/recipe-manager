import { useLoaderData } from "react-router";
import { LabelGroup, Header, Heading, PageLayout } from "@primer/react";
import { HomeIcon } from "@primer/octicons-react";

import CategoryLabel from "../CategoryLabel/CategoryLabel";
import DifficultyLabel from "../DifficultyLabel/DifficultyLabel";
import LengthLabel from "../LengthLabel/LengthLabel";

function RecipeDetails() {
  const recipe = useLoaderData().recipe;
  const ingredients = recipe.ingredients.map((ingredient, index) => (
    <li key={index}>{ingredient}</li>
  ));
  return (
    <PageLayout padding={"none"} containerWidth="full">
      <PageLayout.Header divider={"none"}>
        <Header>
          <Header.Item>
            <Header.Link href="/">
              <HomeIcon size={32} />
              <span>Home</span>
            </Header.Link>
          </Header.Item>
          <Header.Item>
            <Header.Link href="/plan">Plan</Header.Link>
          </Header.Item>
        </Header>
      </PageLayout.Header>
      <PageLayout.Content width={"full"} padding={"normal"}>
        <Heading as={"h1"} sx={{ mb: 2 }}>
          {recipe.name}
        </Heading>
        <LabelGroup>
          <CategoryLabel category={recipe.category} />
          <DifficultyLabel difficulty={recipe.difficulty} />
          <LengthLabel length={recipe.length} />
        </LabelGroup>
      </PageLayout.Content>
    </PageLayout>
  );
}

export default RecipeDetails;
