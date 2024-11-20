import { Box } from "@primer/react";

function PlaceholderDay() {
  return (
    <Box
      className={`day placeholder`}
      sx={{
        width: "100px",
        height: "100px",
        border: "solid",
        borderColor: "border.default",
        borderRadius: 1,
        p: 1,
        bg: "border.default",
      }}
    ></Box>
  );
}

export default PlaceholderDay;
