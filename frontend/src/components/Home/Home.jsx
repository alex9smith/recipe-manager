import { PageLayout, Heading } from "@primer/react";
import { useLoaderData } from "react-router";

import TopNav from "../TopNav/TopNav";
import TodaySummaryCard from "../TodaySummaryCard/TodaySummaryCard";

function Home() {
  const todaysPlan = useLoaderData();

  return (
    <PageLayout padding={"none"} containerWidth="fullg">
      <TopNav />
      <PageLayout.Content width={"full"} padding={"normal"}>
        <Heading as={"h1"} sx={{ mb: 2 }}>
          Recipe Manager
        </Heading>
        <TodaySummaryCard plan={todaysPlan} />
      </PageLayout.Content>
    </PageLayout>
  );
}

export default Home;
