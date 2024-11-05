function CategoryFilter({ selectedCategory, setSelectedCategory }) {
  return (
    <div>
      <label for="category-filter">Choose a category:</label>
      <select
        id="category-filter"
        name="category-filter"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="all">All</option>
        <option value="vegan">Vegan</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="fish">Fish</option>
        <option value="meat">Meat</option>
        <option value="side">Sides</option>
        <option value="dessert">Dessert</option>
      </select>
    </div>
  );
}

export default CategoryFilter;
