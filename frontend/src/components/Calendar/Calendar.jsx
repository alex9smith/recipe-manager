import { useState } from "react";
import { Box } from "@primer/react";
import Day from "../Day/Day";
import MonthSelector from "../MonthSelector/MonthSelector";

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

function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function firstDayOfTheMonth() {
  const date = new Date();
  date.setDate(1);
  return date;
}

function Calendar({ plan, setPlan, recipes }) {
  const [startDate, setStartDate] = useState(firstDayOfTheMonth());
  const today = new Date();
  const days = [];
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
        key={i}
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
