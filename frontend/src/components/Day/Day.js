import { useState } from "react";
import { Box } from "@primer/react";
import { toIsoDate } from "../../services/date";
import PlanPopup from "../PlanPopup/PlanPopup";

const maxTitleLength = 30;

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

function truncate(string) {
  if (string.length < maxTitleLength) {
    return string;
  }

  return string.slice(0, maxTitleLength) + "...";
}

function getDayTitle(daysPlan) {
  if (daysPlan.recipe?.name) {
    return truncate(daysPlan.recipe.name);
  } else {
    if (daysPlan.notes) {
      return truncate(daysPlan.notes);
    } else {
      return "";
    }
  }
}

function Day({ date, state, plan, setPlan, recipes }) {
  const [popupOpen, setPopupOpen] = useState(false);
  const hasPlan = toIsoDate(date) in plan;
  const isoDate = toIsoDate(date);
  const daysPlan = hasPlan ? plan[toIsoDate(date)] : { recipe: {}, notes: "" };

  function updatePlan(planned) {
    const newPlan = { ...plan };
    newPlan[isoDate] = planned;
    setPlan(newPlan);
  }

  function onDrop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/id");
    updatePlan({ recipe: findRecipe(recipes, id), notes: "" });
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
        {getDayTitle(daysPlan)}
      </Box>
      {popupOpen && (
        <PlanPopup
          date={toIsoDate(date)}
          plan={plan}
          setPlan={setPlan}
          togglePopup={togglePopup}
        />
      )}
    </Box>
  );
}

export default Day;
