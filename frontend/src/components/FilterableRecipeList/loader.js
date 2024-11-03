import { apiClient } from "../services/apiClient";

export default function loader() {
  return apiClient.getAllRecipes();
}
