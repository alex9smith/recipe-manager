import { Label } from "@primer/react";

function CategoryLabel({ category }) {
  let colour;
  switch (category) {
    case "vegan":
      colour = "green";
      break;
    case "vegetarian":
      colour = "orange";
      break;
    case "fish":
      colour = "blue";
      break;
    case "meat":
      colour = "red";
      break;
    case "side":
      colour = "purple";
      break;
    case "dessert":
      colour = "brown";
      break;
    case "drink":
      colour = "pink";
      break;
    default:
      console.error(`Category ${category} not recognised`);
      colour = "black";
      break;
  }
  return <Label sx={{ color: colour }}>{category}</Label>;
}

export default CategoryLabel;
