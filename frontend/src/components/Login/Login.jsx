import { Box, Button, PageLayout } from "@primer/react";
import { useNavigate } from "react-router";
import { GoogleLogin } from "@react-oauth/google";
import TopNav from "../TopNav/TopNav";
import { authenticationService } from "../../services/authentication";
import { isProduction } from "../../constants";
import { jwtDecode } from "jwt-decode";

function Login() {
  const navigate = useNavigate();

  function productionLoginHandler(response) {
    const user = jwtDecode(response.credential);
    if (authenticationService.isValidUser(user)) {
      authenticationService.setUser(user);
      navigate("/");
    } else {
      navigate("/unauthorised");
    }
  }

  function developmentLoginHandler() {
    authenticationService.setUser({
      name: "Test",
      given_name: "Test",
      email: "test@example.com",
    });
    navigate("/");
  }

  const loginButton = isProduction() ? (
    <GoogleLogin onSuccess={productionLoginHandler} onError={console.log} />
  ) : (
    <Button onClick={developmentLoginHandler}>Login</Button>
  );
  return (
    <PageLayout padding={"none"} containerWidth="full">
      <TopNav />
      <PageLayout.Content width={"full"} padding={"normal"}>
        <Box>{loginButton}</Box>
      </PageLayout.Content>
    </PageLayout>
  );
}

export default Login;
