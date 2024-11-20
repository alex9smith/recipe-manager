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
      <Box as="span" onClick={previousMonth} sx={{ cursor: "pointer" }}>
        <ChevronLeftIcon size={24} />
      </Box>
      <Box as="span" onClick={nextMonth} sx={{ cursor: "pointer" }}>
        <ChevronRightIcon size={24} />
      </Box>
    </Box>
  );
}

export default MonthSelector;
