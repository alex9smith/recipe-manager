import { useLoaderData } from "react-router";
import { Box, LabelGroup, Header, Heading, PageLayout } from "@primer/react";
import { HomeIcon } from "@primer/octicons-react";

import CategoryLabel from "../CategoryLabel/CategoryLabel";
import DifficultyLabel from "../DifficultyLabel/DifficultyLabel";
import LengthLabel from "../LengthLabel/LengthLabel";
import Source from "../Source/Source";
import Ingredients from "../Ingredients/Ingredients";

function RecipeDetails() {
  const recipe = useLoaderData().recipe;
  return (
    <PageLayout padding={"none"} containerWidth="fullg">
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
        <Box
          sx={{
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "border.default",
            borderRadius: 1,
            p: 3,
            m: 3,
          }}
        >
          <Source source={recipe.source} />
          <Ingredients recipe={recipe} />
        </Box>
      </PageLayout.Content>
    </PageLayout>
  );
}

export default RecipeDetails;
