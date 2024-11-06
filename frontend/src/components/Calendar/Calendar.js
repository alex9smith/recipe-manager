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

function Calendar({ plan, setPlan }) {
  const today = new Date();
  const days = [];
  for (
    let i = 1;
    i <= daysInMonth(today.getFullYear(), today.getMonth());
    i++
  ) {
    const date = new Date();
    date.setDate(i);
    days.push(
      <Day
        date={date}
        state={calculateState(i, today.getDate())}
        plan={plan}
        setPlan={setPlan}
      />
    );
  }
  return <div className="calendar">{days}</div>;
}

export default Calendar;
