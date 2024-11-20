import { Box } from "@primer/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@primer/octicons-react";

function MonthSelector({ startDate, setStartDate }) {
  function nextMonth() {
    const newStartDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      startDate.getDate()
    );
    setStartDate(newStartDate);
  }

  function previousMonth() {
    const newStartDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() - 1,
      startDate.getDate()
    );
    setStartDate(newStartDate);
  }
  return (
    <Box sx={{ mb: 1 }}>
      {startDate.toLocaleString("en-gb", { month: "long", year: "numeric" })}
      <span onClick={previousMonth}>
        <ChevronLeftIcon size={24} />
      </span>
      <span onClick={nextMonth}>
        <ChevronRightIcon size={24} />
      </span>
    </Box>
  );
}

export default MonthSelector;
