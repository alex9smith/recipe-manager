import { useLoaderData } from "react-router";
import { useState } from "react";

import RecipeList from "../RecipeList/RecipeList";
import Filters from "../Filters/Filters";
import SearchBar from "../SearchBar/SearchBar";

import {
  bookNameMatches,
  categoryAllOrMatches,
  difficultyAllOrMatches,
  ingredientsMatch,
  lengthAllOrMatches,
  recipeNameMatches,
} from "../../services/filter";

function FilterableRecipeList() {
  const recipes = useLoaderData()["recipes"];
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedLength, setSelectedLength] = useState("all");

  function filterRecipes(accumulator, recipe) {
    // If the recipe matches the search term in any way
    // AND the recipe matches all of the filters
    if (
      (recipeNameMatches(recipe, searchText) ||
        ingredientsMatch(recipe, searchText) ||
        bookNameMatches(recipe, searchText)) &&
      categoryAllOrMatches(recipe, selectedCategory) &&
      difficultyAllOrMatches(recipe, selectedDifficulty) &&
      lengthAllOrMatches(recipe, selectedLength)
    ) {
      accumulator.push(recipe);
    }
    return accumulator;
  }

  const filteredRecipes = recipes.reduce(filterRecipes, []);
  return (
    <div>
      <SearchBar searchText={searchText} onSearchTextChange={setSearchText} />
      <Filters
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedDifficulty={selectedDifficulty}
        setSelectedDifficulty={setSelectedDifficulty}
        selectedLength={selectedLength}
        setSelectedLength={setSelectedLength}
      />
      <RecipeList recipes={filteredRecipes} />
    </div>
  );
}

export default FilterableRecipeList;
