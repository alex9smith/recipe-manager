import { Select } from "@primer/react";

function LengthFilter({ selectedLength, setSelectedLength, sx }) {
  return (
    <Select
      id="length-filter"
      name="length-filter"
      value={selectedLength}
      onChange={(e) => setSelectedLength(e.target.value)}
      block={true}
      sx={sx}
    >
      <Select.Option value="all">All lengths</Select.Option>
      <Select.Option value="under_30">Under 30 minutes</Select.Option>
      <Select.Option value="under_60">Under 60 minutes</Select.Option>
      <Select.Option value="over_60">Over 60 minutes</Select.Option>
    </Select>
  );
}

export default LengthFilter;
