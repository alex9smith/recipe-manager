import { useState } from "react";
import { Box } from "@primer/react";
import PlanPopup from "../PlanPopup/PlanPopup";

const stateToColour = {
  past: "canvas.subtle",
  future: "canvas.default",
  today: "success.subtle",
};

function findRecipe(recipes, id) {
  return recipes.filter((recipe) => recipe.id === id)[0];
}

function onDragOver(e) {
  e.preventDefault();
  e.dataTransfer.effectAllowed = "copy";
}

function toIsoDate(date) {
  return date.toISOString().split("T", 1)[0];
}

function Day({ date, state, plan, setPlan, recipes }) {
  const [popupOpen, setPopupOpen] = useState(false);
  const hasPlan = toIsoDate(date) in plan;
  const recipeName = hasPlan ? plan[toIsoDate(date)].recipe.name : "";

  function onDrop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/id");
    const recipe = findRecipe(recipes, id);
    const newPlan = { ...plan };
    newPlan[toIsoDate(date)] = { recipe: recipe, notes: "" };
    setPlan(newPlan);
  }

  function togglePopup() {
    setPopupOpen(!popupOpen);
  }

  return (
    <Box>
      <Box
        className={`day ${state}`}
        key={date.getDate()}
        id={date.getDate()}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onClick={togglePopup}
        sx={{
          width: "100px",
          height: "100px",
          border: "solid",
          cursor: "pointer",
          borderRadius: 1,
          p: 1,
          bg: stateToColour[state],
          lineHeight: "normal",
          fontSize: 1,
        }}
      >
        {date.getDate()}
        <br></br>
        {recipeName}
      </Box>
      {popupOpen && (
        <PlanPopup
          date={toIsoDate(date)}
          recipe={hasPlan ? plan[toIsoDate(date)].recipe : {}}
          plan={plan}
          setPlan={setPlan}
          togglePopup={togglePopup}
        />
      )}
    </Box>
  );
}

export default Day;
