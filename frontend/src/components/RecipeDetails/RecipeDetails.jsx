import { useLoaderData, useNavigate } from "react-router";
import { useState } from "react";
import {
  LabelGroup,
  Heading,
  Box,
  Button,
  Dialog,
  ButtonGroup,
  Spinner,
} from "@primer/react";
import FullWidthPage from "../FullWidthPage/FullWidthPage";
import BorderBox from "../BorderBox/BorderBox";
import CategoryLabel from "../CategoryLabel/CategoryLabel";
import DifficultyLabel from "../DifficultyLabel/DifficultyLabel";
import LengthLabel from "../LengthLabel/LengthLabel";
import Source from "../Source/Source";
import Ingredients from "../Ingredients/Ingredients";
import AddOrEditRecipe from "../AddNewOrEditRecipe/AddNewOrEditRecipe";
import { apiClient } from "../../services/apiClient";

function RecipeDetails() {
  const navigate = useNavigate();
  const recipe = useLoaderData().recipe;
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  async function deleteRecipe() {
    setIsDeleting(true);
    await apiClient.deleteRecipe(recipe.id);
    navigate("/");
  }

  const displayRecipe = (
    <Box>
      <Heading as={"h1"} sx={{ mb: 2 }}>
        {recipe.name}
      </Heading>
      <LabelGroup>
        <CategoryLabel category={recipe.category} />
        <DifficultyLabel difficulty={recipe.difficulty} />
        <LengthLabel length={recipe.length} />
      </LabelGroup>
      <BorderBox>
        <Source source={recipe.source} />
        <Ingredients recipe={recipe} />
      </BorderBox>
      <ButtonGroup>
        <Button variant="primary" onClick={() => setIsEditing(true)}>
          Edit recipe
        </Button>
        <Button variant="danger" onClick={() => setShowDeletePopup(true)}>
          Delete recipe
        </Button>
      </ButtonGroup>

      {showDeletePopup && (
        <Dialog
          title="Are you sure?"
          onClose={() => setShowDeletePopup(false)}
          footerButtons={[
            {
              buttonType: "primary",
              content: "Close",
              onClick: () => setShowDeletePopup(false),
            },
            {
              buttonType: "danger",
              content: "Delete recipe",
              onClick: deleteRecipe,
            },
          ]}
        >
          {isDeleting ? (
            <Spinner />
          ) : (
            "Are you sure you want to delete this recipe?"
          )}
        </Dialog>
      )}
    </Box>
  );

  return (
    <FullWidthPage>
      {isEditing ? (
        <AddOrEditRecipe recipe={recipe} onSubmit={() => setIsEditing(false)} />
      ) : (
        displayRecipe
      )}
    </FullWidthPage>
  );
}

export default RecipeDetails;
