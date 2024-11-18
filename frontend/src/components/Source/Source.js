import { Box } from "@primer/react";
import { Link } from "react-router-dom";

function Source({ source }) {
  let content;
  switch (source.type) {
    case "website":
      content = (
        <Link to={source.address} target="_blank" rel="noopener noreferrer">
          Recipe link
        </Link>
      );
      break;
    case "book":
      content = `${source.title}, page ${source.page}`;
      break;
    default:
      console.error(`Recipe source type "${source.type}" not recognised`);
      content = "No source found";
      break;
  }
  return <Box>{content}</Box>;
}

export default Source;
