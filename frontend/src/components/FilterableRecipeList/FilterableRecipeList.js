import { useLoaderData } from "react-router";
import { useState } from "react";

import RecipeList from "../RecipeList/RecipeList";
import CategoryFilter from "../CategoryFilter/CategoryFilter";
import SearchBar from "../SearchBar/SearchBar";

function FilterableRecipeList() {
  const recipes = useLoaderData()["recipes"];
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  function filterRecipes(accumulator, recipe) {
    // If the recipe matches the selected category
    if ((selectedCategory === "all") | (selectedCategory === recipe.category)) {
      // The search text is in the recipe name
      if (recipe.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
        accumulator.push(recipe);
      }
      // The search text is in an ingredient
      else {
        if (
          recipe.ingredients.some(
            (ingredient) =>
              ingredient.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
          )
        ) {
          accumulator.push(recipe);
        } else {
          // The search text is in the book title
          if (recipe.source.type === "book") {
            if (
              recipe.source.title
                .toLowerCase()
                .indexOf(searchText.toLowerCase()) !== -1
            ) {
              accumulator.push(recipe);
            }
          }
        }
      }
    }

    return accumulator;
  }

  const filteredRecipes = recipes.reduce(filterRecipes, []);
  return (
    <div>
      <SearchBar searchText={searchText} onSearchTextChange={setSearchText} />
      <CategoryFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <RecipeList recipes={filteredRecipes} />
    </div>
  );
}

export default FilterableRecipeList;
