import { useState } from "react";
import Day from "../Day/Day";

import "./Calendar.css";

function calculateState(day, today) {
  if (day === today) {
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
  const days = [];
  for (
    let i = 1;
    i <= daysInMonth(startDate.getFullYear(), startDate.getMonth());
    i++
  ) {
    const date = new Date();
    date.setDate(i);
    days.push(
      <Day
        key={i}
        date={date}
        state={calculateState(i, startDate.getDate())}
        plan={plan}
        setPlan={setPlan}
        recipes={recipes}
      />
    );
  }
  return <div className="calendar">{days}</div>;
}

export default Calendar;
