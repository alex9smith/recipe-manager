function DifficultyFilter({ selectedDifficulty, setSelectedDifficulty }) {
  return (
    <div className="filter">
      <select
        id="difficulty-filter"
        name="difficulty-filter"
        value={selectedDifficulty}
        onChange={(e) => setSelectedDifficulty(e.target.value)}
      >
        <option value="all">All difficulties</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );
}

export default DifficultyFilter;
