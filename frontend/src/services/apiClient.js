import { getApiBaseUrl } from "../constants";

// 5 minutes in milliseconds
const EXPIRES_IN = 5 * 60 * 10000;

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

  #cacheItem(type, data) {
    this.storage.setItem(`${type}-saved-at`, Date.now());
    this.storage.setItem(`${type}`, JSON.stringify(data));
  }

  #getCachedItem(type) {
    const savedAt = this.storage.getItem(`${type}-saved-at`);
    const data = this.storage.getItem(`${type}`);

    // if we don't have both items
    if (!(savedAt && data)) {
      return null;
    }

    if (hasExpired(parseInt(savedAt))) {
      return null;
    }

    return JSON.parse(data);
  }

  async getAllRecipes() {
    const cached = this.#getCachedItem("recipes");
    if (cached) {
      return cached;
    }
    // otherwise fetch the recipes and cache the result
    const recipes = await this.#getUrl("/recipes");
    this.#cacheItem("recipes", recipes);
    return recipes;
  }

  async getRecipe(id) {
    const cached = this.#getCachedItem("recipes");
    if (cached) {
      const allRecipes = cached.recipes;
      return { recipe: allRecipes.filter((r) => r.id === id).pop() };
    }
    return await this.#getUrl(`/recipes/${id}`);
  }

  async saveRecipe(recipe) {
    const response = await fetch(this.baseUrl + this.prefix + "/recipes", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const savedRecipe = await response.json();
    const cachedRecipes = await this.getAllRecipes();
    cachedRecipes.recipes = [...cachedRecipes.recipes, savedRecipe.recipe];
    this.#cacheItem("recipes", cachedRecipes);
    return savedRecipe;
  }

  async getPlan() {
    const cached = this.#getCachedItem("plan");
    if (cached) {
      return cached;
    }
    const plan = await this.#getUrl("/plan");
    this.#cacheItem("plan", plan.plan);
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
    this.#cacheItem("plan", plan);
  }

  async deleteRecipe(id) {
    const response = await fetch(
      this.baseUrl + this.prefix + `/recipes/${id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error deleting recipe - status: ${response.status}`);
    }
    this.storage.removeItem("recipes");
    const cachedRecipes = await this.getAllRecipes();
    this.#cacheItem("recipes", cachedRecipes);
  }

  clearCache() {
    this.storage.removeItem("plan");
    this.storage.removeItem("recipes");
  }
}

export const apiClient = new ApiClient(getApiBaseUrl());
