import { Box, Button } from "@primer/react";
import { useNavigate } from "react-router";
import { authenticationService } from "../../services/authentication";

function Login() {
  const navigate = useNavigate();

  function loginHandler() {
    authenticationService.setUser({ name: "test" });
    navigate("/");
  }
  return (
    <Box>
      Toggle Login:
      <Button onClick={loginHandler}>Toggle</Button>
    </Box>
  );
}

export default Login;
