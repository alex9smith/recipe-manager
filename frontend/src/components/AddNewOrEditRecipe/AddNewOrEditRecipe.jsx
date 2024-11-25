import {
  Box,
  Button,
  Heading,
  FormControl,
  Select,
  TextInput,
  TextInputWithTokens,
} from "@primer/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import FullWidthPage from "../FullWidthPage/FullWidthPage";
import { apiClient } from "../../services/apiClient";

function getElementValue(id) {
  const element = document.getElementById(id);
  return element ? element.value : null;
}

export default function AddOrEditRecipe({ recipe }) {
  const navigate = useNavigate();

  const initialValues = recipe
    ? recipe
    : {
        name: "",
        tags: [],
        category: "",
        difficulty: "",
        length: "",
        ingredients: [],
        source: {
          type: "",
          address: "",
          title: "",
          page: "",
        },
      };

  const [sourceType, setSourceType] = useState("book");
  const sourceFields =
    sourceType === "book" ? (
      <Box>
        <FormControl required={true} id="recipe-source-title">
          <FormControl.Label>Title</FormControl.Label>
          <TextInput defaultValue={initialValues.source.title} />
        </FormControl>
        <FormControl required={true} id="recipe-source-page">
          <FormControl.Label>Page number</FormControl.Label>
          <TextInput defaultValue={initialValues.source.page} />
        </FormControl>
      </Box>
    ) : (
      <FormControl required={true} id="recipe-source-address">
        <FormControl.Label>Website address</FormControl.Label>
        <TextInput defaultValue={initialValues.source.address} />
      </FormControl>
    );

  const [ingredients, setIngredients] = useState(
    initialValues.ingredients.map((ingredient) => {
      id: ingredient, text.ingredient;
    })
  );

  function onIngredientRemove(ingredientId) {
    setIngredients(
      ingredients.filter((ingredient) => ingredient.id !== ingredientId)
    );
  }

  function onIngredientAdd(event) {
    if (event.key === "Enter" && event.target.value) {
      const newIngredient = {
        id: event.target.value,
        text: event.target.value,
      };
      setIngredients([...ingredients, newIngredient]);
      event.target.value = "";
    }
  }

  async function handleSubmit(event) {
    const recipe = {
      name: getElementValue("recipe-name"),
      category: getElementValue("recipe-category"),
      length: getElementValue("recipe-length"),
      difficulty: getElementValue("recipe-difficulty"),
      tags: [],
      source: {
        type: getElementValue("recipe-source-type"),
        address: getElementValue("recipe-source-address"),
        title: getElementValue("recipe-source-title"),
        page: getElementValue("recipe-source-page"),
      },
      ingredients: ingredients.map((ingredient) => ingredient.text),
    };
    const response = await apiClient.saveRecipe(recipe);
    navigate(`/recipes/${response.recipe.id}`);
  }

  return (
    <FullWidthPage>
      <Heading>{recipe ? "Edit recipe" : "Add a recipe"}</Heading>
      <Box as="form">
        <FormControl required={true} id="recipe-name">
          <FormControl.Label>Recipe name</FormControl.Label>
          <TextInput defaultValue={initialValues.name} />
        </FormControl>
        <FormControl required={true} id="recipe-category">
          <FormControl.Label>Category</FormControl.Label>
          <Select defaultValue={initialValues.category}>
            <Select.Option value="vegan">Vegan</Select.Option>
            <Select.Option value="vegetarian">Vegetarian</Select.Option>
            <Select.Option value="fish">Fish</Select.Option>
            <Select.Option value="meat">Meat</Select.Option>
            <Select.Option value="side">Sides</Select.Option>
            <Select.Option value="dessert">Dessert</Select.Option>
          </Select>
        </FormControl>
        <FormControl required={true} id="recipe-difficulty">
          <FormControl.Label>Difficulty</FormControl.Label>
          <Select defaultValue={initialValues.difficulty}>
            <Select.Option value="easy">Easy</Select.Option>
            <Select.Option value="medium">Medium</Select.Option>
            <Select.Option value="hard">Hard</Select.Option>
          </Select>
        </FormControl>
        <FormControl required={true} id="recipe-length">
          <FormControl.Label>Length</FormControl.Label>
          <Select defaultValue={initialValues.length}>
            <Select.Option value="under_30">Under 30 minutes</Select.Option>
            <Select.Option value="under_60">Under 60 minutes</Select.Option>
            <Select.Option value="over_60">Over 60 minutes</Select.Option>
          </Select>
        </FormControl>
        <FormControl required={true} id="recipe-source-type">
          <FormControl.Label>Source</FormControl.Label>
          <Select
            onChange={(e) => setSourceType(e.target.value)}
            defaultValue={initialValues.source.type}
          >
            <Select.Option value="book">Cookbook</Select.Option>
            <Select.Option value="website">Website</Select.Option>
          </Select>
        </FormControl>
        {sourceFields}
        <FormControl>
          <FormControl.Label>Ingredients</FormControl.Label>
          <TextInputWithTokens
            tokens={ingredients}
            onTokenRemove={onIngredientRemove}
            onKeyDown={onIngredientAdd}
            size="medium"
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Save recipe</FormControl.Label>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </FormControl>
      </Box>
    </FullWidthPage>
  );
}
