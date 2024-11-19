import { Label } from "@primer/react";

function LengthLabel({ length }) {
  let colour;
  switch (length) {
    case "under_30":
      colour = "green";
      break;
    case "under_60":
      colour = "orange";
      break;
    case "over_60":
      colour = "red";
      break;
    default:
      console.error(`Category ${length} not recognised`);
      colour = "black";
      break;
  }
  return <Label sx={{ color: colour }}>{length.replace("_", " ")}</Label>;
}

export default LengthLabel;
