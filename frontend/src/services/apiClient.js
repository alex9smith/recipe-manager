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
    const plan = await this.#getUrl("/plan");
    console.log("got plan");
    console.log(plan);
    return plan.plan;
  }

  async savePlan(plan) {
    console.log("saving plan");
    console.log(plan);
    const response = await fetch(this.baseUrl + this.prefix + "/plan", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plan),
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
  }
}

export const apiClient = new ApiClient(getApiBaseUrl());
