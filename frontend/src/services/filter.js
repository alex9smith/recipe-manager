export function recipeNameMatches(recipe, searchText) {
  return recipe.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
}

export function ingredientsMatch(recipe, searchText) {
  return recipe.ingredients.some(
    (ingredient) =>
      ingredient.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
  );
}

export function bookNameMatches(recipe, searchText) {
  if (recipe.source.type === "book") {
    return (
      recipe.source.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    );
  } else {
    return false;
  }
}

export function categoryAllOrMatches(recipe, selectedCategory) {
  if (selectedCategory === "all") {
    return true;
  }

  return recipe.category.toLowerCase() === selectedCategory.toLowerCase();
}

export function difficultyAllOrMatches(recipe, selectedDifficulty) {
  if (selectedDifficulty === "all") {
    return true;
  }

  return recipe.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
}

export function lengthAllOrMatches(recipe, selectedLength) {
  if (selectedLength === "all") {
    return true;
  }

  return recipe.length.toLowerCase() === selectedLength.toLowerCase();
}
