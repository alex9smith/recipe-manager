import { Header, PageLayout } from "@primer/react";

import { HomeIcon } from "@primer/octicons-react";

function TopNav() {
  return (
    <PageLayout.Header divider={"none"}>
      <Header>
        <Header.Item>
          <Header.Link href="/">
            <HomeIcon size={32} />
            <span>Home</span>
          </Header.Link>
        </Header.Item>
        <Header.Item>
          <Header.Link href="/plan">Plan</Header.Link>
        </Header.Item>
      </Header>
    </PageLayout.Header>
  );
}

export default TopNav;
