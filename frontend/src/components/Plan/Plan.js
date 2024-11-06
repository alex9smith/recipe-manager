import { useLoaderData } from "react-router";
import FilterableRecipeList from "../FilterableRecipeList/FilterableRecipeList";
import Calendar from "../Calendar/Calendar";

import "./Plan.css";
import { useState } from "react";

function Plan() {
  const data = useLoaderData();
  const [plan, setPlan] = useState(data.plan);
  return (
    <div className="plan-container">
      <FilterableRecipeList recipes={data.recipes} />
      <Calendar plan={plan} setPlan={setPlan} />
    </div>
  );
}

export default Plan;
