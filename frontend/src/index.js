import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, BaseStyles } from "@primer/react";
import "./index.css";
import Home from "./components/Home/Home";
import homeLoader from "./components/Home/loader";
import PageLayout from "./components/PageLayout/PageLayout";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RecipeDetails from "./components/RecipeDetails/RecipeDetails";
import recipeDetailsLoader from "./components/RecipeDetails/loader";
import Plan from "./components/Plan/Plan";
import planLoader from "./components/Plan/loader";
import NewPlan from "./components/NewPlan/NewPlan";

const router = createBrowserRouter([
  {
    element: <PageLayout />,
    children: [
      {
        path: "plan",
        element: <Plan />,
        loader: planLoader,
      },
    ],
  },
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
    path: "newplan",
    element: <NewPlan />,
    loader: planLoader,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider>
    <BaseStyles>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </BaseStyles>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
