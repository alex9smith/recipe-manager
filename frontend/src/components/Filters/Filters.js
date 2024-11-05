import CategoryFilter from "../CategoryFilter/CategoryFilter";
import DifficultyFilter from "../DifficultyFilter/DifficultyFilter";
import LengthFilter from "../LengthFilter/LengthFilter";

function Filters({
  selectedCategory,
  setSelectedCategory,
  selectedDifficulty,
  setSelectedDifficulty,
  selectedLength,
  setSelectedLength,
}) {
  return (
    <div>
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
    </div>
  );
}

export default Filters;
