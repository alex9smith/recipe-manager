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

function Calendar() {
  const today = new Date();
  const days = [];
  for (
    let i = 1;
    i <= daysInMonth(today.getFullYear(), today.getMonth());
    i++
  ) {
    days.push(<Day date={i} state={calculateState(i, today.getDate())} />);
  }
  return <div className="calendar">{days}</div>;
}

export default Calendar;
