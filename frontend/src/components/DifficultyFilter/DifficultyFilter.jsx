import { Select } from "@primer/react";

function DifficultyFilter({ selectedDifficulty, setSelectedDifficulty, sx }) {
  return (
    <Select
      id="difficulty-filter"
      name="difficulty-filter"
      value={selectedDifficulty}
      onChange={(e) => setSelectedDifficulty(e.target.value)}
      block={true}
      sx={sx}
    >
      <Select.Option value="all">All difficulties</Select.Option>
      <Select.Option value="easy">Easy</Select.Option>
      <Select.Option value="medium">Medium</Select.Option>
      <Select.Option value="hard">Hard</Select.Option>
    </Select>
  );
}

export default DifficultyFilter;
