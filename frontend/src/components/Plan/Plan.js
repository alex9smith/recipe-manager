import { useLoaderData } from "react-router";
import FilterableRecipeList from "../FilterableRecipeList/FilterableRecipeList";
import Calendar from "../Calendar/Calendar";

import { apiClient } from "../../services/apiClient";

import { useEffect, useState } from "react";

function Plan() {
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
    <div className="plan-container">
      <FilterableRecipeList recipes={data.recipes} />
      <Calendar plan={plan} setPlan={setPlan} recipes={data.recipes} />
    </div>
  );
}

export default Plan;
