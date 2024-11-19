import { PageLayout, Heading } from "@primer/react";
import { useLoaderData } from "react-router";

import TopNav from "../TopNav/TopNav";
import RecipeSummaryCard from "../RecipeSummaryCard/RecipeSummaryCard";

function Home() {
  const todaysRecipe = useLoaderData();

  return (
    <PageLayout padding={"none"} containerWidth="fullg">
      <TopNav />
      <PageLayout.Content width={"full"} padding={"normal"}>
        <Heading as={"h1"} sx={{ mb: 2 }}>
          Recipe Manager
        </Heading>
        <RecipeSummaryCard recipe={todaysRecipe} />
      </PageLayout.Content>
    </PageLayout>
  );
}

export default Home;
