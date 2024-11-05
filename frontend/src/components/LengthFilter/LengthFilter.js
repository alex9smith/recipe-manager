function LengthFilter({ selectedLength, setSelectedLength }) {
  return (
    <div>
      <label htmlFor="length-filter">Choose a length:</label>
      <select
        id="length-filter"
        name="length-filter"
        value={selectedLength}
        onChange={(e) => setSelectedLength(e.target.value)}
      >
        <option value="all">All</option>
        <option value="under_30">Under 30 minutes</option>
        <option value="under_60">Under 60 minutes</option>
        <option value="over_60">Over 60 minutes</option>
      </select>
    </div>
  );
}

export default LengthFilter;
