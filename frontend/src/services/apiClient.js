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
}

export const apiClient = new ApiClient(getApiBaseUrl());
