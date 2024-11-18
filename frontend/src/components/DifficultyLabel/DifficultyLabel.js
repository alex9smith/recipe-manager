import { Label } from "@primer/react";

function DifficultyLabel({ difficulty }) {
  let colour;
  switch (difficulty) {
    case "easy":
      colour = "green";
      break;
    case "medium":
      colour = "orange";
      break;
    case "hard":
      colour = "red";
      break;
    default:
      console.error(`Category ${difficulty} not recognised`);
      colour = "black";
      break;
  }
  return <Label sx={{ color: colour }}>{difficulty}</Label>;
}

export default DifficultyLabel;
