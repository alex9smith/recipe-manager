export function toIsoDate(date) {
  return date.toISOString().split("T", 1)[0];
}
