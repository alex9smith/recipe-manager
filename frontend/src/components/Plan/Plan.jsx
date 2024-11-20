import { Box, PageLayout } from "@primer/react";
import { useLoaderData } from "react-router";
import { useState, useEffect } from "react";
import { apiClient } from "../../services/apiClient";
import TopNav from "../TopNav/TopNav";
import FilterableRecipeList from "../FilterableRecipeList/FilterableRecipeList";
import Calendar from "../Calendar/Calendar";

function NewPlan() {
  const data = useLoaderData();
  const [plan, setPlan] = useState(data.planned);

  useEffect(() => {
    function onTimeout() {
      apiClient.savePlan(plan);
    }

    const timeoutId = setTimeout(onTimeout, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [plan]);

  return (
    <PageLayout
      padding={"none"}
      containerWidth="full"
      rowGap="none"
      columnGap="none"
    >
      <TopNav />
      <PageLayout.Content width={"full"} padding={"normal"}>
        <Calendar plan={plan} setPlan={setPlan} recipes={data.recipes} />
      </PageLayout.Content>
      <Box
        className="sidebar"
        sx={{ borderRight: "solid", borderColor: "border.default" }}
      >
        <PageLayout.Pane
          position="start"
          resizable
          padding="normal"
          divider="none"
          sticky="true"
          aria-label="recipe-list"
          hidden={{ narrow: true, regular: false, wide: false }}
        >
          <FilterableRecipeList recipes={data.recipes} />
        </PageLayout.Pane>
      </Box>
    </PageLayout>
  );
}

export default NewPlan;
