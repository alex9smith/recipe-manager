import { Select } from "@primer/react";

function CategoryFilter({ selectedCategory, setSelectedCategory, sx }) {
  return (
    <Select
      id="category-filter"
      name="category-filter"
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      block={true}
      sx={sx}
    >
      <Select.Option value="all">All categories</Select.Option>
      <Select.Option value="vegan">Vegan</Select.Option>
      <Select.Option value="vegetarian">Vegetarian</Select.Option>
      <Select.Option value="fish">Fish</Select.Option>
      <Select.Option value="meat">Meat</Select.Option>
      <Select.Option value="side">Sides</Select.Option>
      <Select.Option value="dessert">Dessert</Select.Option>
    </Select>
  );
}

export default CategoryFilter;
