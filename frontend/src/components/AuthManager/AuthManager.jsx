import { useState } from "react";
import IsAuthenticatedContext from "../../context/IsAuthenticatedContext";
import SetAuthenticatedContext from "../../context/SetAuthenticatedContext";

function AuthManager({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <IsAuthenticatedContext.Provider value={isAuthenticated}>
      <SetAuthenticatedContext.Provider value={setIsAuthenticated}>
        {children}
      </SetAuthenticatedContext.Provider>
    </IsAuthenticatedContext.Provider>
  );
}

export default AuthManager;
