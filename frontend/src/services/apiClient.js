import { getApiBaseUrl } from "../constants";

class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.prefix = "/api/v1";
  }

  async #getUrl(route) {
    const response = await fetch(this.baseUrl + this.prefix + route);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
  }

  async getAllRecipes() {
    return await this.#getUrl("/recipes");
  }

  async getRecipe(id) {
    return await this.#getUrl(`/recipes/${id}`);
  }

  async getPlan() {
    return {
      "2024-11-07": {
        recipe: { name: "Summer salmon salad", id: "1234" },
        notes: "",
      },
      "2024-11-08": {
        recipe: { name: "Sweetcorn chowder", id: "5678" },
        notes: "",
      },
    };
  }

  async savePlan(plan) {
    console.log("Saving plan");
  }
}

export const apiClient = new ApiClient(getApiBaseUrl());
