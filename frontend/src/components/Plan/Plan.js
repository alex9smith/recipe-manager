import { useLoaderData } from "react-router";
import FilterableRecipeList from "../FilterableRecipeList/FilterableRecipeList";
import Calendar from "../Calendar/Calendar";

import "./Plan.css";

function Plan() {
  const data = useLoaderData();
  return (
    <div className="plan-container">
      <FilterableRecipeList recipes={data.recipes} />
      <Calendar />
    </div>
  );
}

export default Plan;
