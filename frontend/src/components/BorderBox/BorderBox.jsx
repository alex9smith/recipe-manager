import { Box } from "@primer/react";

function BorderBox({ sx, children }) {
  const defaults = {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "border.default",
    borderRadius: 2,
    p: 3,
    m: 3,
  };
  return <Box sx={{ ...defaults, ...sx }}>{children}</Box>;
}

export default BorderBox;
