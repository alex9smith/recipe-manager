import { Heading } from "@primer/react";
import { useLoaderData } from "react-router";

import FullWidthPage from "../FullWidthPage/FullWidthPage";
import TopNav from "../TopNav/TopNav";
import TodaySummaryCard from "../TodaySummaryCard/TodaySummaryCard";

function Home() {
  const todaysPlan = useLoaderData();

  return (
    <FullWidthPage>
      <Heading as={"h1"} sx={{ mb: 2 }}>
        Meal planner
      </Heading>
      <TodaySummaryCard plan={todaysPlan} />
    </FullWidthPage>
  );
}

export default Home;
