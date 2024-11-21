import { getApiBaseUrl } from "../constants";

// 5 minutes in milliseconds
const EXPIRES_IN = 5 * 60 * 1000;

function hasExpired(timestamp) {
  return timestamp <= Date.now() - EXPIRES_IN;
}

class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.prefix = "/api/v1";
    this.storage = window.sessionStorage;
  }

  async #getUrl(route) {
    const response = await fetch(this.baseUrl + this.prefix + route);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
  }

  #cacheRecipes(recipes) {
    this.storage.setItem("recipes-saved-at", Date.now());
    this.storage.setItem("recipes", JSON.stringify(recipes));
  }

  #getCachedRecipes() {
    const savedAt = this.storage.getItem("recipes-saved-at");
    const recipes = this.storage.getItem("recipes");

    // if we don't have both items
    if (!(savedAt && recipes)) {
      return null;
    }

    if (hasExpired(parseInt(savedAt))) {
      return null;
    }

    return JSON.parse(recipes);
  }

  async getAllRecipes() {
    const cached = this.#getCachedRecipes();
    if (cached) {
      return cached;
    }
    // otherwise fetch the recipes and cache the result
    const recipes = await this.#getUrl("/recipes");
    this.#cacheRecipes(recipes);
    return recipes;
  }

  async getRecipe(id) {
    return await this.#getUrl(`/recipes/${id}`);
  }

  async getPlan() {
    const plan = await this.#getUrl("/plan");
    return plan.plan;
  }

  async savePlan(plan) {
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
