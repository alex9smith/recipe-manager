import { Box, Header, PageLayout } from "@primer/react";
import { HomeIcon } from "@primer/octicons-react";
import { useNavigate } from "react-router";
import { authenticationService } from "../../services/authentication";

function TopNav() {
  const navigate = useNavigate();
  const logInOrOut = authenticationService.isAuthenticated() ? (
    <Header.Item>
      <Header.Link
        as="div"
        onClick={() => {
          authenticationService.logout();
          navigate("/login");
        }}
      >
        Log out
      </Header.Link>
    </Header.Item>
  ) : (
    <Header.Item>
      <Header.Link href="/login">Log in</Header.Link>
    </Header.Item>
  );
  return (
    <PageLayout.Header divider={"none"}>
      <Header>
        <Header.Item>
          <Header.Link href="/">
            <HomeIcon size={32} />
            <span>&nbsp;Home</span>
          </Header.Link>
        </Header.Item>
        <Header.Item full>
          <Header.Link href="/plan">Plan</Header.Link>
        </Header.Item>
        {logInOrOut}
      </Header>
    </PageLayout.Header>
  );
}

export default TopNav;
