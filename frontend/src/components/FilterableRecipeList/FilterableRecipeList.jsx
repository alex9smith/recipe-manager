import { useState } from "react";
import { Box, FormControl } from "@primer/react";

import RecipeList from "../RecipeList/RecipeList";
import SearchBar from "../SearchBar/SearchBar";
import CategoryFilter from "../CategoryFilter/CategoryFilter";
import DifficultyFilter from "../DifficultyFilter/DifficultyFilter";
import LengthFilter from "../LengthFilter/LengthFilter";

import {
  bookNameMatches,
  categoryAllOrMatches,
  difficultyAllOrMatches,
  ingredientsMatch,
  lengthAllOrMatches,
  recipeNameMatches,
} from "../../services/filter";

function sortRecipes(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

function FilterableRecipeList({ recipes }) {
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
  filteredRecipes.sort(sortRecipes);
  return (
    <Box>
      <Box
        as="form"
        sx={{
          pb: 1,
          borderBottom: "solid",
          borderBottomColor: "border.default",
        }}
      >
        <FormControl>
          <FormControl.Label visuallyHidden>Recipe filters</FormControl.Label>
          <SearchBar
            searchText={searchText}
            onSearchTextChange={setSearchText}
          />
          <CategoryFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <DifficultyFilter
            selectedDifficulty={selectedDifficulty}
            setSelectedDifficulty={setSelectedDifficulty}
          />
          <LengthFilter
            selectedLength={selectedLength}
            setSelectedLength={setSelectedLength}
          />
        </FormControl>
      </Box>
      <RecipeList recipes={filteredRecipes} />
    </Box>
  );
}

export default FilterableRecipeList;
