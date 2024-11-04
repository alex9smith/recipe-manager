import { apiClient } from "../../services/apiClient";

export default function loader({ params }) {
  return apiClient.getRecipe(params.recipeId);
}
