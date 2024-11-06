import { apiClient } from "../../services/apiClient";

async function loader() {
  const recipes = await apiClient.getAllRecipes();
  const plans = await apiClient.getAllPlans();
  return {
    recipes: recipes.recipes,
    plans: plans,
  };
}

export default loader;
