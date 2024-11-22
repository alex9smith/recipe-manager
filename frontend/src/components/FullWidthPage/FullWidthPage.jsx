import { PageLayout } from "@primer/react";
import TopNav from "../TopNav/TopNav";

export default function FullWidthPage({ children }) {
  return (
    <PageLayout padding={"none"} containerWidth="full">
      <TopNav />
      <PageLayout.Content width={"full"} padding={"normal"}>
        {children}
      </PageLayout.Content>
    </PageLayout>
  );
}
