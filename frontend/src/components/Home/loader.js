import { toIsoDate } from "../../services/date";
import { apiClient } from "../../services/apiClient";

export default async function loader() {
  const today = toIsoDate(new Date());
  const plan = await apiClient.getPlan();
  return today in plan ? plan[today] : null;
}
