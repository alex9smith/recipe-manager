import { useState } from "react";
import { Box } from "@primer/react";
import Day from "../Day/Day";
import MonthSelector from "../MonthSelector/MonthSelector";
import PlaceholderDay from "../PlaceholderDay/PlaceholderDay";

import "./Calendar.css";

const dayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

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

function weekdaysBefore(date) {
  // .getDay() returns a zero indexed day where Sunday is 0
  // This calendar shows Monday as the first day of the week
  // so translate the index up to Monday as 0, keeping the 0-6 range
  return (date.getDay() + 6) % 7;
}

function daysOfWeek() {
  const days = [];
  dayNames.forEach((day, index) => {
    days.push(<Box key={`day-${index}`}>{day}</Box>);
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
