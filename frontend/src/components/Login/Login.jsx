import { Box, Button, PageLayout, Spinner } from "@primer/react";
import { useNavigate } from "react-router";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import TopNav from "../TopNav/TopNav";
import { authenticationService } from "../../services/authentication";
import { isProduction } from "../../constants";
import { jwtDecode } from "jwt-decode";

function Login() {
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  function productionLoginHandler(response) {
    setIsLoggingIn(true);
    const user = jwtDecode(response.credential);
    if (authenticationService.isValidUser(user)) {
      authenticationService.setUser(user);
      navigate("/");
    } else {
      navigate("/unauthorised");
    }
  }

  function developmentLoginHandler() {
    setIsLoggingIn(true);
    authenticationService.setUser({
      name: "Test",
      given_name: "Test",
      email: "test@example.com",
    });
    setTimeout(() => {
      navigate("/");
    }, 1000);
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
        {isLoggingIn ? <Spinner size="large" /> : loginButton}
      </PageLayout.Content>
    </PageLayout>
  );
}

export default Login;
