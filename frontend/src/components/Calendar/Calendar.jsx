import { useState } from "react";
import { Box } from "@primer/react";
import {
  dayNames,
  daysInMonth,
  firstDayOfTheMonth,
  weekdaysBefore,
} from "../../services/date";
import Day from "../Day/Day";
import MonthSelector from "../MonthSelector/MonthSelector";
import PlaceholderDay from "../PlaceholderDay/PlaceholderDay";

import "./Calendar.css";

function calculateState(day, today) {
  if (
    day.getFullYear() === today.getFullYear() &&
    day.getMonth() === today.getMonth() &&
    day.getDate() === today.getDate()
  ) {
    return "today";
  }
  if (day < today) {
    return "past";
  }
  return "future";
}

function daysOfWeek() {
  const days = [];
  dayNames.forEach((day, index) => {
    days.push(
      <Box key={`dayname-${index}`} className="day-of-week">
        {day}
      </Box>
    );
  });

  return days;
}

function Calendar({ plan, setPlan, recipes }) {
  const [startDate, setStartDate] = useState(firstDayOfTheMonth());
  const today = new Date();
  // Start with the day labels
  const days = [...daysOfWeek()];
  // Fill the placeholder days before the month starts
  for (let i = 1; i <= weekdaysBefore(startDate); i++) {
    days.push(<PlaceholderDay key={`placeholder-${i}`} />);
  }

  // Fill the real days
  for (
    let i = 1;
    i <= daysInMonth(startDate.getFullYear(), startDate.getMonth());
    i++
  ) {
    const date = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    );
    date.setDate(i);
    days.push(
      <Day
        key={`day-${i}`}
        date={date}
        state={calculateState(date, today)}
        plan={plan}
        setPlan={setPlan}
        recipes={recipes}
      />
    );
  }
  return (
    <Box>
      <MonthSelector startDate={startDate} setStartDate={setStartDate} />
      <div className="calendar">{days}</div>
    </Box>
  );
}

export default Calendar;
