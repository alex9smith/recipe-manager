export const dayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function toIsoDate(date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T", 1)[0];
}

export function weekdaysBefore(date) {
  // .getDay() returns a zero indexed day where Sunday is 0
  // This calendar shows Monday as the first day of the week
  // so translate the index up to Monday as 0, keeping the 0-6 range
  return (date.getDay() + 6) % 7;
}

export function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export function firstDayOfTheMonth() {
  const date = new Date();
  date.setDate(1);
  return date;
}
