import { Box, PageLayout } from "@primer/react";
import TopNav from "../TopNav/TopNav";

function Unauthorised() {
  return (
    <PageLayout padding={"none"} containerWidth="full">
      <TopNav />
      <PageLayout.Content width={"full"} padding={"normal"}>
        <Box>A user with that email address was not found</Box>
      </PageLayout.Content>
    </PageLayout>
  );
}

export default Unauthorised;
