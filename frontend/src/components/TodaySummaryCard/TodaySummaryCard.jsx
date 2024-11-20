import { Heading } from "@primer/react";
import { Link } from "react-router-dom";
import BorderBox from "../BorderBox/BorderBox";
import Source from "../Source/Source";

function TodaySummaryCard({ plan }) {
  const link =
    plan && plan.recipe && plan.recipe.id && plan.recipe.name ? (
      <Link to={`/recipes/${plan.recipe.id}`}>{plan.recipe.name}</Link>
    ) : null;
  const source =
    plan && plan.recipe && plan.recipe.source ? (
      <Source source={plan.recipe.source} />
    ) : null;
  const notes =
    plan && plan.notes
      ? `${plan.recipe && plan.recipe.name ? "Notes: " : ""}${plan.notes}`
      : null;
  return (
    <BorderBox>
      <Heading as="h3" variant="small">
        {plan ? "Today's recipe:" : "Nothing planned for today"}
      </Heading>
      {link}
      {source}
      {notes}
    </BorderBox>
  );
}

export default TodaySummaryCard;
