import { Box, Button, PageLayout } from "@primer/react";
import { useNavigate } from "react-router";
import TopNav from "../TopNav/TopNav";
import { authenticationService } from "../../services/authentication";

function Login() {
  const navigate = useNavigate();

  function loginHandler() {
    authenticationService.setUser({ name: "test" });
    navigate("/");
  }
  return (
    <PageLayout padding={"none"} containerWidth="full">
      <TopNav />
      <PageLayout.Content width={"full"} padding={"normal"}>
        <Box>
          <Button onClick={loginHandler}>Login</Button>
        </Box>
      </PageLayout.Content>
    </PageLayout>
  );
}

export default Login;
