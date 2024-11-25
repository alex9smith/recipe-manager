import { useLoaderData } from "react-router";
import FilterableRecipeList from "../FilterableRecipeList/FilterableRecipeList";
import FullWidthPage from "../FullWidthPage/FullWidthPage";

function AllRecipes() {
  const data = useLoaderData();
  return (
    <FullWidthPage>
      <FilterableRecipeList recipes={data.recipes} />
    </FullWidthPage>
  );
}

export default AllRecipes;
