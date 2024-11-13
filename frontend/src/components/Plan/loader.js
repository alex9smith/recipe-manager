import { apiClient } from "../../services/apiClient";

async function loader() {
  const recipes = await apiClient.getAllRecipes();
  const planned = await apiClient.getPlan();
  return {
    recipes: recipes.recipes,
    planned: planned,
  };
}

export default loader;
