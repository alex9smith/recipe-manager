import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, BaseStyles } from "@primer/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import homeLoader from "./components/Home/loader";
import reportWebVitals from "./reportWebVitals";
import RecipeDetails from "./components/RecipeDetails/RecipeDetails";
import recipeDetailsLoader from "./components/RecipeDetails/loader";
import Plan from "./components/Plan/Plan";
import planLoader from "./components/Plan/loader";
import PrivateRoutes from "./components/PrivateRoutes/PrivateRoutes";
import Unauthorised from "./components/Unauthorised/Unauthorised";
import { getOAuthClientId } from "./constants";
import NotFound from "./components/NotFound/NotFound";

const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "unauthorised",
    element: <Unauthorised />,
    status: 401,
  },
  {
    path: "/",
    element: <PrivateRoutes />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: "recipes/:recipeId",
        element: <RecipeDetails />,
        loader: recipeDetailsLoader,
      },
      {
        path: "plan",
        element: <Plan />,
        loader: planLoader,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
    status: 404,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId={getOAuthClientId()}>
    <ThemeProvider>
      <BaseStyles>
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </BaseStyles>
    </ThemeProvider>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
