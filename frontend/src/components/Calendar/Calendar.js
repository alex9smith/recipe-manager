import "./Calendar.css";

function Calendar() {
  const days = [];
  for (let i = 1; i <= 31; i++) {
    days.push(
      <div className="day" id={i}>
        {i}
      </div>
    );
  }
  return <div className="calendar">{days}</div>;
}

export default Calendar;
