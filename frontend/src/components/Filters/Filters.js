import CategoryFilter from "../CategoryFilter/CategoryFilter";

function Filters({ selectedCategory, setSelectedCategory }) {
  return (
    <CategoryFilter
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
    />
  );
}

export default Filters;
